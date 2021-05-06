import { useRef } from "react"
import Actions from "./Actions"
import Comments from "./Comments"
import Footer from "./Footer"
import Header from "./Header"
import Image from "./Image"


const Post = ({ content }) => {
  console.log(content)
  const { username, imageSrc, caption, docId, likes, userLikedPhoto, comments, dateCreated } = content

  const commentInput = useRef(null)
  // gives you a ref to the direct element so the state doesnt update all the time
  const handleFocus = () => commentInput.current?.focus()

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={username}/>

      <Image src={imageSrc} caption={caption}/>
      <Actions 
        docId={docId}
        totalLikes={likes.length}
        likedPhoto={userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={caption} username={username}/>
      <Comments 
        docId={docId} 
        comments={comments} 
        posted={dateCreated}
        commentInput={commentInput}
        />
    </div>
  )
}

export default Post