import './wdyr'
import React from 'react'
import reactDom from 'react-dom'
import App from './App'
import { FirebaseContext }from './context/firebase'
import { firebase, FieldValue } from "./lib/firebase";
reactDom.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
   
  document.getElementById('root')
)

// client side rendered app: react (cra)
// src
  // components
  // constants
  // context
  // helpers
  // hooks
  // pages
  // lib (firebase)
  // services (firebase func)
  // styles