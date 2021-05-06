import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from './constants/routes'
import { UserContext } from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import './index.css'

import ProtectedRoute from './helpers/protected.route'
import IsUserLoggedIn from "./helpers/is-user-logged-in";



const Login = lazy(() => import ('./pages/login'))
const SignUp = lazy(() => import ('./pages/sign-up'))
const Dashboard = lazy(() => import ('./pages/dashboard'))
const NotFound = lazy(() => import ('./pages/not-found'))
const Profile = lazy(() => import('./pages/profile'))
console.log(<Profile />)
const App = () => {
  const { user } = useAuthListener()
  console.log(user)
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            
            {/* if user try to access login page after logged in, they will be redirected to dashboard */}
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN} exact >
              <Login />
            </IsUserLoggedIn>

            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP} exact>
              <SignUp />
            </IsUserLoggedIn>
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact >
              <Dashboard />
            </ProtectedRoute>
            
            <Route path={ROUTES.PROFILE} >
              <Profile />
            </Route>
            <Route >
              <NotFound />
            </Route>

          </Switch>
  
        </Suspense>
        
      </Router>
    </UserContext.Provider>
  );
}

export default App;
