import React from 'react'
import { fireEvent, render, waitFor, act, findByTestId } from '@testing-library/react'
// import { MemoryRouter } from 'react-router-dom';
import {  Router } from "react-router-dom";
// import { act } from 'react-dom/test-utils'
import {createMemoryHistory} from 'history'
import { FirebaseContext } from '../../context/firebase'
import Login from '../../pages/login';
import * as ROUTES from '../../constants/routes'


// jest.mock('react-router-dom', () => ({
  //   // meaning we want to mock this module but aquire  actual to bring it back to its normal state and after that mock just useHistory?????? -- Besides, we only want to mock useHistory hook, so we should use jest.requireActual() to get the original module and keep other methods as the original version.
  //   ...jest.requireActual('react-router-dom'),
  //   useHistory: () => ({
    //     // a fake var and check
    //     push: mockHistoryPush 
    
    //   })
    
    // }))
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'),
useHistory: () => ({
push: mockHistoryPush,
}),
}));

// import reactRouterDom from 'react-router-dom';
// jest.mock('react-router-dom');

// const pushMock = jest.fn();
// Router.useHistory = jest.fn().mockReturnValue({push: pushMock});

describe('<Login />', () => {
  beforeEach(() => {
    // bring everything back to normal
    jest.clearAllMocks()
  })


  const history = createMemoryHistory()
  const pushSpy = jest.spyOn(history, 'push') // or 'replace', 'goBack', etc.
  it('render the login page with a form submission and logs the user in', async () => {

    const succeedToLogin = jest.fn(() => Promise.resolve('I am signed in!'))
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeedToLogin
      }))
    }
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(

      <Router history={history}>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    ) 

    await act(async() => {

      expect(document.title).toEqual('Login - Instagram')

      await fireEvent.change(getByPlaceholderText('Email Address'), {
        target: { value: 'test@test.com'}
      })

      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'test-password'}
      })
      const form = getByTestId('login')

      fireEvent.submit(form)
  

      expect(succeedToLogin).toHaveBeenCalled()
      expect(succeedToLogin).toHaveBeenCalledWith('test@test.com', 'test-password')

  
      // await after the button has been fired again
      await waitFor(() => {
        expect(pushSpy).toHaveBeenCalledWith(ROUTES.DASHBOARD)
        // expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD)
     
        expect(getByPlaceholderText('Email Address').value).toBe('test@test.com')
        expect(getByPlaceholderText('Password').value).toBe('test-password')
        expect(queryByTestId('Error')).toBeFalsy()
      })
    })
  })
})