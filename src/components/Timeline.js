import Skeleton from "react-loading-skeleton"
import usePhotos from "../hooks/use-photos"
import Post from "./post"

const Timeline = () => {
  // get the logged in user's photos (hook)
  let { photos } = usePhotos()

  // on loading the photos, use react skeleton
  
  // if have photos, render

  // if user has no photos, tell them to display photos


  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          <Skeleton count={4} width={640} height={500} className="mb-5"/>
        </>
      ): photos?.length > 0? (
        photos.map(content => (
          <Post key={content.docId} content={content} />
        ))
      ): (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </div>
  )
}

export default Timeline