import { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../context/firebase'

const useAuthListener = () => {
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('authUser')))

  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(authUser => {
      // if we have a user, sotre the user in localstorage
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setUser(authUser)
      } else {
        // we dont have an authUser, clear the localstorage
        localStorage.removeItem('authUser')
        setUser(null)
      }
    })
    // close the connection on listener with firebase
    return () => listener()
  }, [firebase])

  return { user }
}
export default useAuthListener