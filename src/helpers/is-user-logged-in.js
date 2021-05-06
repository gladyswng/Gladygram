import { Redirect, Route } from 'react-router-dom'
// import * as ROUTES from '../constants/routes'


const IsUserLoggedIn = ({ user, loggedInPath, children, ...rest}) => {
  // loggedInPath - test to see is the user logged in and are they trying to access login, if yes redirect to dashboard

  return (
    <Route 
      {...rest} 
      render={({ location }) => {
        if (!user) {
          return children
        }

        if (user) {
          return (
            <Redirect to={{ 
              // instead of hard coding dashboard, using loggedInpath allow us to have ability to change where we can send them to 
              pathname: loggedInPath,
              state: { from: location}
             }}/>
          )
        }
        return null
      }}
    />
  )
}
export default IsUserLoggedIn