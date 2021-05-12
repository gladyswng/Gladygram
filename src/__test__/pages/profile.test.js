import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import {createMemoryHistory} from 'history'
import { loggedInUser as userFixture } from '../../fixtures/logged-in-user'
import  { timelinePhotos as photosFixture } from '../../fixtures/timeline-photos'
import { suggestedProfiles } from '../../fixtures/suggested-profiles'
import Profile from '../../pages/profile'

import useUser from '../../hooks/use-user'
import { getPhotos, getSuggestedProfiles, getUserByUsername, getUserPhotosByUsername } from '../../services/firebase'

import { FirebaseContext } from '../../context/firebase'
import { UserContext } from '../../context/user'
import { LoggedInUserContext } from '../../context/logged-in-user'
import Dashboard from '../../pages/dashboard'
import { Router } from 'react-router'
import { profileUserFollowed } from '../../fixtures/profile-followed-by-logged-in-user'
import { profileUserNotFollowed } from '../../fixtures/profile-not-followed-by-logged-in-user'
import * as ROUTES from '../../constants/routes'

jest.mock('../../services/firebase')
jest.mock('../../hooks/use-user')
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    username: 'gladys'
  })
}))


describe('<Profile/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const firebase = {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(() => Promise.resolve('User added'))
        }))
      }))

    })),
    auth: jest.fn(() => () => ({
      signOut: jest.fn(() => Promise.resolve({}))
    }))


  }

  it('renders the profile page with a user profile', async () => {
    const history = createMemoryHistory()
    const pushSpy = jest.spyOn(history, 'push') // or 'replace', 'goBack', etc.
    
    await act(async() => {
      getUserByUsername.mockImplementation(() => [userFixture])
      getUserPhotosByUsername.mockImplementation(() => photosFixture)
      useUser.mockImplementation(() => ({userFixture}))
      


      render(
        <Router history={history} >
          <FirebaseContext.Provider value={{ firebase }}>
            <UserContext.Provider value={{ uid: 'dvbdxfmacuV1IQgxGgC09fLmXFJ2', displayName: 'gladys' }}>
              <Profile />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      ) 
    })

    await waitFor(() => {
      expect(pushSpy).not.toHaveBeenCalled()
      expect(pushSpy).not.toHaveBeenCalledWith(ROUTES.NOT_FOUND)
      // passes from useparams mock
      expect(getUserByUsername).toHaveBeenCalledWith('gladys')
      expect(screen.getByTitle('Sign out')).toBeTruthy()
      expect(screen.getByText('logged in user name')).toBeTruthy()
      expect(screen.getByText('user full name')).toBeTruthy()
      expect(screen.getByText('5 photos')).toBeTruthy()
      // screen.getByText((content, node) => {
      //   const hasText = (node) => node.textContent === '3 followers'
      //   const nodeHasText = hasText(node)
      //   const childrenDontHaveText = Array.from(node.children).every(child => !hasText(child))
      //   return nodeHasText && childrenDontHaveText
      // })


      // okay, go ahead and sign the user out of the
      fireEvent.click(screen.getByTitle('Sign out'))

      expect(pushSpy).toHaveBeenCalledWith(ROUTES.LOGIN)

    })

  })

  

})