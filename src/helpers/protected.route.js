

import { Redirect, Route } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
/* Check if user is logged in and get user access to certain routes, specially when theres no jwt */

const ProtectedRoute = ({ user, children, ...rest }) => {
  return (
    <Route 
      {...rest} 
      render={({ location }) => {
        if (user) {
          console.log(children)
          return children
        }

        if (!user) {
          return (
            <Redirect to={{ 
              pathname: ROUTES.LOGIN,
              state: { from: location}
             }}/>
          )
        }
        return null
      }}
    />
  )
}
export default ProtectedRoute