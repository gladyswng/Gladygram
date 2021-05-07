import { useEffect, useState } from "react"
// import { UserContext } from "../context/user"
import { getPhotos,  } from "../services/firebase"



const usePhotos = (user) => {
  const [ photos, setPhotos ] = useState(null)
  // destructure out data, change name and set default as '' otherwise null
  // const { uid: userId ='' } = useContext(UserContext) - got rid of it since we passed in the user now
  const { userId, following } = user
  useEffect(() => {
     if (!userId) {
       return
     }
    const getTimelinePhotos = async () => {
      // example: [ 2, 1, 5 ] <- 2 being raphel
     
      // const [ { following } ] = await getUserByUserId(userId)

      // let followedUserPhotos = []

      // does the user actually follow people
      if(following?.length > 0) {

        const followedUserPhotos = await getPhotos(userId, following)      
        // re-arrange array to be newest photos first by dateCreated
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
        setPhotos(followedUserPhotos)
      }

    } 


    getTimelinePhotos()

  }, [userId])

  return { photos}
}


export default usePhotos