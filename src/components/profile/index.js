import { useEffect, useReducer } from "react"
import { getUserByUsername, getUserPhotosByUsername } from "../../services/firebase"
import Header from "./Header"

import Photos from "./Photos"

const reducer = (state, newState) => ({ ...state, ...newState })

const initialState = {
  profile: {},
  photosCollection: [],
  followersCount: 0
}

const UserProfile = ({ username }) => {
  const [ { profile, photosCollection, followersCount }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {

    
    const getProfileInfoAndPhotos = async () => {
      const [user] = await getUserByUsername(username)
      
      const photos = await getUserPhotosByUsername(username)
      dispatch({ profile: user, photosCollection: photos, followersCount: user.followers.length })

    }

    getProfileInfoAndPhotos()
  }, [username])


  return (
    <>
      {/* followersCount instead of taking from profile with followers because we need to update the  */}

      <Header 
        photosCount={photosCollection? photosCollection.length : 0}
        profile={profile}
        followersCount={followersCount}
        setFollowersCount={dispatch}
        // loggedInUsername={}
      />
      <Photos photos={photosCollection}/>
    
    </>
  )
}
export default UserProfile