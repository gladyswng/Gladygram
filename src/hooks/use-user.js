
// we need to call firebase to get

import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/user"
import { getUserByUserId } from "../services/firebase"

const useUser = () => {
  const [ activeUser, setActiveUser ] = useState({})
  const user = useContext(UserContext)


  useEffect(() => {
    const getUserObjByUserId = async () => {
      // function to call firebase service to get user data based on user id
      const [ response ] = await getUserByUserId(user.uid)
      setActiveUser(response)
    
    }
    if(user?.uid) {
      getUserObjByUserId()
    } 
  }, [user])
  // console.log('activeuser', activeUser)

  return { user: activeUser}
}

export default useUser