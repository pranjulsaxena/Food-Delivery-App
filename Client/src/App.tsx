import React from 'react'
import Login from './auth/login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './MainLayout'
import Signup
 from './auth/Signup'
const approuter = createBrowserRouter([
  {path:"/",
    element:<MainLayout/>
  },
  {path:"/login",
    element:<Login/>
  },
  {path:"/signup",
    element:<Signup/>
  }
])

function App() {
  return (
  <main>
    <RouterProvider router={approuter}/>
    
  </main>
  )
}

export default App
