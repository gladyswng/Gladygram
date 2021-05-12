import { useContext } from "react"
import { LoggedInUserContext } from "../../context/logged-in-user"

import Suggestions from "./Suggestions"
import User from "./User"

const Sidebar = () => {
  // const { user: { fullName, username, userId, following, docId }  } = useUser()
  const {  fullName, username, userId='', following, docId } = useContext(LoggedInUserContext)
  return (
    <div className="hidden lg:block p-4 ">
      <User username={username} fullName={fullName}/>
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
    </div>
  )
}
export default Sidebar