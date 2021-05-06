import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/user"
import { getPhotos, getUserByUserId } from "../services/firebase"



const usePhotos = () => {
  const [ photos, setPhotos ] = useState(null)
  // destructure out data, change name and set default as '' otherwise null
  const { uid: userId ='' } = useContext(UserContext)
  useEffect(() => {
     if (!userId) {
       return
     }
    const getTimelinePhotos = async () => {
      // example: [ 2, 1, 5 ] <- 2 being raphel
     
      const [ { following } ] = await getUserByUserId(userId)

      let followedUserPhotos = []

      // does the user actually follow people
      if(following?.length > 0) {

        followedUserPhotos = await getPhotos(userId, following)      
      }
      // re-arrange array to be newest photos first by dateCreated
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
      setPhotos(followedUserPhotos)

    } 


    getTimelinePhotos()

  }, [userId])

  return { photos}
}


export default usePhotos