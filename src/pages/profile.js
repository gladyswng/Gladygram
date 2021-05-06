import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { getUserByUsername } from "../services/firebase"
import * as ROUTES from '../constants/routes'
import Header from "../components/Header"
import UserProfile from '../components/profile'
const Profile = () => {
  const { username } = useParams()
  const history = useHistory()


  const [ user, setUser ] = useState(null)
  // const [ userExists, setUserExists ] = useState(false)

  useEffect(() => {
    if (!username) {
      return
    }
    
    const checkUserExists = async () => {
      const [user] = await getUserByUsername(username)
  
      if (user) {
        setUser(user)
        // setUserExists(true)
      } else {
   
        history.push(ROUTES.NOT_FOUND)
      }
    }

    checkUserExists()
    
  }, [username, history])
  console.log('user', user)
  return user? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile username={username}/>
      </div>
    </div>
  ): null
}
export default Profile