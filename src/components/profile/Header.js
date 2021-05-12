import { useContext, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { UserContext } from "../../context/user"
import useUser from "../../hooks/use-user"
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase"

const Header = ({ photosCount, profile,   followersCount, setFollowersCount }) => {
  const { docId: profileDocId, userId: profileUserId, fullName, following, username: profileUsername, followers } = profile
  // we actually dont want to pass down a large amount of obj like here with followers or following
  const loggedInUser = useContext(UserContext)

  const { user } = useUser(loggedInUser.uid)  
  const [ isFollowingProfile, setIsFollowingProfile ] = useState(false)
  const activeBtnFollow = user?.username !== profileUsername


  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId)

      setIsFollowingProfile(isFollowing)

    }

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile()
    }

  }, [user?.username, profileUserId])

  const handleToggleFollow = async () => {
    setIsFollowingProfile(isFollowingProfile => !isFollowingProfile)
    setFollowersCount({
      followersCount: isFollowingProfile? followersCount - 1 : followersCount + 1
    })
    await toggleFollow(isFollowingProfile, user.userId, user.docId, profileDocId, profileUserId)
  } 

  // console.log('user', profileUsername)


  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (<img 
          className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-40 lg:w-40 flex"
          alt={`${profileUsername} profile`}
          src={`/images/avatars/${profileUsername}.jpg`}
        />) : (
          <img 
          className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-40 lg:w-40 flex"
          alt={`default profile`}
          src={`/images/avatars/default.jpg`}
        />
        )}
      </div>
        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center">
            <p className="text-2xl mr-4">{profileUsername}</p>
            {activeBtnFollow && (
              <button 
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleToggleFollow()
                }}
              >
                {isFollowingProfile? 'Unfollow' : 'Follow'}

              </button>
            )}
          </div>
          <div className="container flex mt-4 flex-col lg:flex-row">
            {!followers || !following ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <p className="mr-10">
                  <span className="font-bold">{photosCount}</span>{` `}
                  {photosCount === 1 ? 'photo' : 'photos'}
                </p>
                <p className="mr-10">
                  <span className="font-bold">{followersCount}</span>{` `}
                  {followersCount === 1 ? 'follower' : 'followers'}
                </p>
                <p className="mr-10">
                  <span className="font-bold">{following.length}</span>{` `}
                  {following.length === 1 ? 'follower' : 'followers'}
                </p>
              </>
            )}
          </div>
          <div className="container mt-4">
            <p className="font-medium">{!fullName? 'NO NAME YET' : fullName }</p>
          </div>
        </div>
    </div>
  )
}
export default Header