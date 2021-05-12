import React from 'react'
import { queryByText, render, screen, waitFor } from '@testing-library/react'
import { FirebaseContext } from '../../context/firebase'
import { UserContext } from '../../context/user'
import NotFound from '../../pages/not-found'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { loggedInUser } from '../../fixtures/logged-in-user'
import { getUserByUserId } from '../../services/firebase'

// const firebase = {
//   auth: jest.fn
// }

jest.mock('../../services/firebase', () => ({
  // ...jest.requireActual('../../services/firebase'),
  getUserByUserId: jest.fn()
}));


describe('<NotFound />',  () => {
  it.skip('renders the not found page with a logged in user', async() => {
    const history = createMemoryHistory()
    // const getUserByUserId = jest.fn()
    await getUserByUserId.mockImplementation(() => ([loggedInUser]))
    render(
      <Router history={history}>
        <FirebaseContext.Provider value={{}}>
          <UserContext.Provider value={ { uid: 1}}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router> 
      
    )

    await waitFor(() => {
      expect(screen.queryByText('Log In')).toBeFalsy()
      expect(screen.queryByText('Not Found')).toBeTruthy()
    })

  })

  it('renders the not found page without logged in user', async() => {
    const history = createMemoryHistory()
    // const getUserByUserId = jest.fn()
    await getUserByUserId.mockImplementation(() => ([]))
    render(
      <Router history={history}>
        <FirebaseContext.Provider value={{}}>
          <UserContext.Provider value={{}}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router> 
      
    )

    await waitFor(() => {
      expect(screen.queryByText('Log In')).toBeTruthy()
      expect(screen.queryByText('Not Found')).toBeTruthy()
    })

  })
})