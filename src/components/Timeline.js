import { useContext } from "react"
import Skeleton from "react-loading-skeleton"
import { LoggedInUserContext } from "../context/logged-in-user"
import usePhotos from "../hooks/use-photos"
import Post from "./post"

const Timeline = () => {
  const user = useContext(LoggedInUserContext)


  // get the logged in user's photos (hook)
  let { photos } = usePhotos(user)

  // on loading the photos, use react skeleton
  
  // if have photos, render

  // if user has no photos, tell them to display photos


  return (
    <div className="col-span-3 lg:col-span-2">
      {!photos ? (
        <>
          <Skeleton count={4} width={640} height={500} className="mb-5"/>
        </>
      ): (
        photos.map(content => (
          <Post key={content.docId} content={content} />
        ))
      ) }
    </div>
    // photos?.length > 0? 
    // (
    //     <p className="text-center text-2xl">Follow people to see photos!</p>
    //   )
  )
}

export default Timeline