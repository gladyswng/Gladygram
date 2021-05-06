import { useState } from "react"
import { Link } from "react-router-dom"
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from "../../services/firebase"

const SuggestedProfile = ({ 
  suggestedProfileDocId, 
  username, 
  profileId, 
  userId, 
  loggedInUserDocId }) => {
  const [ followed, setFollowed ] = useState(false)
  // useEffect(() => {

  // }, [])

  const handleFollowUser = async () => {
    setFollowed(true)

    // firebase: create 2 services (funcs)

    //  update the following array of the logged in user (my profile)
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
    // update the followers array of user who has been followed
    await updateFollowedUserFollowers(suggestedProfileDocId, userId, false)

  }

  return !followed ? (
    <div className="flex flex-row item-center align-itesms justify-between">
      <div className="flex item-center justify-betwen">
        <img 
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      
        <button 
          className="text-xs font-bold text-blue-medium" 
          type="button"
          onClick={handleFollowUser}
        >Follow</button>
 
    </div>
  ) : null


}
export default SuggestedProfile