
// we need to call firebase to get

import  { useEffect, useState } from "react"
import { getUserByUserId } from "../services/firebase"

const useUser = (userId) => {
  const [ activeUser, setActiveUser ] = useState({})
    

  useEffect(() => {
    
    // here we dont want to call when user doesnt exist
    const getUserObjByUserId = async () => {
      // function to call firebase service to get user data based on user id

      
      const [ user ] = await getUserByUserId(userId)

      setActiveUser(user || {})
    
    }
    

    if(userId) {
   
      getUserObjByUserId()
    } 
  }, [userId])


  return { user: activeUser}
}

export default useUser