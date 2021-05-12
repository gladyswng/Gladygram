import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import {createMemoryHistory} from 'history'
import { loggedInUser } from '../../fixtures/logged-in-user'
import  { timelinePhotos } from '../../fixtures/timeline-photos'
import { suggestedProfiles } from '../../fixtures/suggested-profiles'

import useUser from '../../hooks/use-user'
import { getPhotos, getSuggestedProfiles } from '../../services/firebase'

import { FirebaseContext } from '../../context/firebase'
import { UserContext } from '../../context/user'
import { LoggedInUserContext } from '../../context/logged-in-user'
import Dashboard from '../../pages/dashboard'
import { Router } from 'react-router'


jest.mock('../../services/firebase')
jest.mock('../../hooks/use-user')



describe('<Dashboard/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })



  it('renders the dashboard with a user profile and follows a user from the suggested sidebar', async () => {
    const history = createMemoryHistory()


      const firebase = {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(() => Promise.resolve('User added'))
        }))
      }))

    })),

    // FieldValue: {
    //   arrayUnion: jest.fn(),
    //   arrayRemove: jest.fn()
    // }
    // auth: jest.fn(() => ({
    //   createUserWithEmailAndPassword: jest.fn(() =>({
    //     user: { 
    //       updateProfile: jest.fn(() =>(() => Promise.resolve('I am signed up')))
    //      }
    //   }))
    // }))
  }

  const fieldValues = {

    FieldValue: {
      arrayUnion: jest.fn(),
      arrayRemove: jest.fn()
    }
  }


    await act(async () => {

      await getPhotos.mockImplementation(() => timelinePhotos)
      await getSuggestedProfiles.mockImplementation(() => suggestedProfiles)
      // need the suggeste profile fixtures
      await useUser.mockImplementation(() => ({user:loggedInUser}))
  
      render(
        <Router history={history}>
  
          <FirebaseContext.Provider value={{firebase, FieldValue: fieldValues }}>
            <UserContext.Provider value={{ uid: 'dvbdxfmacuV1IQgxGgC09fLmXFJ2', displayName: 'gladys' }}>
              <LoggedInUserContext.Provider value={{ loggedInUser }}>
                <Dashboard user={{ uid: 'dvbdxfmacuV1IQgxGgC09fLmXFJ2', displayName: 'gladys' }} />
              </LoggedInUserContext.Provider>
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      )
  
    })

    await waitFor(() => {
      expect(document.title).toEqual('Instagram')
      expect(screen.getByTitle('Sign out')).toBeTruthy()
      expect(screen.getAllByAltText('raphael')).toBeTruthy()
      expect(screen.getByAltText('Instagram')).toBeTruthy()
      expect(screen.getByAltText('gladys profile')).toBeTruthy()
      expect(screen.getByText('Suggestions for you')).toBeTruthy()

      // follow the user
      fireEvent.click(screen.getByText('Follow'))

      // regular click
      fireEvent.click(screen.getByTestId('like-photo-id'))
      // toggle like using keyboard
      fireEvent.keyDown(screen.getByTestId('like-photo-id'), {
        key: 'Enter'
      })
      // click to focus on the comment icont -> input box
      fireEvent.click(screen.getByTestId('like-input-id'))
      // add a comment to a photo on the dashboard
      fireEvent.change(screen.getByTestId('focus-input-id'), {
        target: { value: 'Amazing photo'}

      })

      // submit the form of the particular doc id
      fireEvent.submit(screen.getByTestId('add-comment-submit-id'))

      // submit a comment or at least attempt with an invalid string length
      // add a comment to a photo on the dashboard

      fireEvent.change(screen.getByTestId('add-comment-id'), {
        target: { value: '' }
      })

      fireEvent.submit(screen.getByTestId('add-comment-submit-id'))

      // toggle focus
      fireEvent.keyDown(screen.getByTestId('focus-input-id'), { 
        key: 'Enter'
      })


      // submit a comment using  d
      fireEvent.submit(screen.getByTestId('add-comment-submit-id'))

    })


  })
  it('renders the dashboard with a user profile of undefined', async () => {
    // we presume there is no collection
    const history = createMemoryHistory()
      const firebase = {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(() => Promise.resolve({}))
        }))
      }))

    }))
  }

    await act(async () => {

      await getPhotos.mockImplementation(() => timelinePhotos)
      await getSuggestedProfiles.mockImplementation(() => suggestedProfiles)
      // need the suggeste profile fixtures
      await useUser.mockImplementation(() => ({user:loggedInUser}))
  
      render(
        <Router history={history}>
  
          <FirebaseContext.Provider value={{firebase }}>
            <UserContext.Provider value={{ uid: 'dvbdxfmacuV1IQgxGgC09fLmXFJ2', displayName: 'gladys' }}>
              <LoggedInUserContext.Provider value={{ loggedInUser }}>
                <Dashboard user={{ uid: 'dvbdxfmacuV1IQgxGgC09fLmXFJ2', displayName: 'gladys' }} />
              </LoggedInUserContext.Provider>
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      )
  
    })


    expect(screen.getByText('Login')).toBeTruthy()
    expect(screen.getByText('Sign In')).toBeTruthy()
    expect(screen.getByText('Suggestions for you')).toBeTruthy()
    // remember to swtich to falsy first to see the test is not lying

    

  })

})