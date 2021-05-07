import { firebase, FieldValue } from '../lib/firebase'

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()
    return result.docs.map((user) => user.data()).length > 0

}

//  get user data by user id
export const getUserByUserId = async(userId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()
  const user = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }))

  return user
}
export const getUserByUsername = async(username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()
  const user = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }))


  return user
}

export const getSuggestedProfiles = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get()

    // const [ following ]  
    const users = result.docs
      .map(user => ({
      ...user.data(),
      docId: user.id
      }))
      .filter(profile => profile.userId !== userId && !following.includes(profile.userId))
  
    
  return users

}


export const updateLoggedInUserFollowing = async (loggedInUserDocId, profileUserId, isFollowingProfile) => {
  return firebase 
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: 
        isFollowingProfile? 
        FieldValue.arrayRemove(profileUserId) 
        : 
        FieldValue.arrayUnion(profileUserId)
    })
}

export const updateFollowedUserFollowers = async (suggestedProfileDocId, userId, isFollowingProfile) => {
    return firebase 
    .firestore()
    .collection('users')
    .doc(suggestedProfileDocId)
    .update({
      followers: 
        isFollowingProfile? 
        FieldValue.arrayRemove(userId) 
        : 
        FieldValue.arrayUnion(userId)
    })

}

export const getPhotos = async (userId, following) => {

  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get()

    const userFollowedPhotos = result.docs.map(photo => ({
      ...photo.data(),
      docId: photo.id
    }))



    const photosWithUserDetails = await Promise.all(
      userFollowedPhotos.map(async (photo) => {
        let userLikedPhoto = false
        if (photo.likes.includes(userId)) {
          userLikedPhoto = true
        }
        // photo.userId = 2
        const user = await getUserByUserId(photo.userId)
        // raphael
        const { username } = user[0]
        return { username, ...photo, userLikedPhoto }
      })
    )


    return photosWithUserDetails
}

// export const getUserIdByUsername = (username) => {
//   const result = await firebase
//     .firestore()
//     .collection('users')
//     .where('users', )
// }

export const getUserPhotosByUsername = async (username) => {  
  console.log(username)
  const [{ userId }] = await getUserByUsername(username)
  const result = await firebase 
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get()

  const photos = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }))

  return photos

}

export const isUserFollowingProfile = async (loggedInUserUsername, profileUserId) => {

  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get()

    // default to an empty obj just in case theres nothing there
  const [ response={} ]  = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }))


  return !!Object.keys(response).length
}

// toggeling follow since we need to update two users when follow or unfollow
export const toggleFollow = async (isFollowingProfile, activeUserId, activeUserDocId, profileDocId, profileUserId) => {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile)
  await updateFollowedUserFollowers(profileDocId, activeUserId, isFollowingProfile)

}