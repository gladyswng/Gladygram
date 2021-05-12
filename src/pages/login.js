import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { FirebaseContext } from "../context/firebase"
import * as ROUTES from "../constants/routes"

const Login = () => {

  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)


  const [ emailAddress, setEmailAddress ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ error, setError ] = useState('')
  const isInvalid = password === '' || emailAddress === ''

  const handleLogin = async (event) => {
    event.preventDefault()

    try { 
       
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
      // console.log('history run next')
      history.push(ROUTES.DASHBOARD)
    } catch (e) {
      setEmailAddress('')
      setPassword('')
      setError(e.message)
    }
  }

  useEffect(() => {
    document.title = 'Login - Instagram'
  }, [])

  return (
    <div className="container flex flex-col lg:flex-row mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
      <div className="hidden lg:visible lg:flex w-5/5 lg:3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone with instagram" />

      </div>
      <div className="flex flex-col w-full justify-center h-full max-w-md m-auto lg:w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="gladygram" className="mt-2 mb-4"/>
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary" data-testid="error">{error}</p>}
          <form onSubmit={handleLogin} method="POST" data-testid="login">
            <input 
              aria-label="Enter your email address"
              type="text"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full mr-e py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target })=> setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input 
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-e py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target })=> setPassword(target.value)}
              value={password}
            />

            <button disabled={isInvalid} type="submit" className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`} data-testid="submitbutton">Login</button>

            
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Don't have an account? &nbsp;
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium" data-testid="sign-up">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login