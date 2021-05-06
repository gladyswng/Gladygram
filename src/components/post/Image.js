const Image = ({ src, caption }) => {
  return (
    <div >
      <img src={src} alt={caption}/>
    </div>
  )
}
export default Image