import React, { useEffect } from 'react'
import Home from './components/Home'

import { BrowserRouter as Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Blog from './components/Blog'
import Login from './components/Login'
import Allblog from './components/Allblog'
import Signup from './components/Signup'
import Protect from './components/Protect'
import Adminsign from './components/admin/Adminsign'
import Adminlogin from './components/admin/Adminlogin'
import Category from './components/admin/Category'
import Siderbar from './components/admin/Siderbar'
import AdminProtect from './components/AdminProtect'
import UserContext from './context/UserContext'
import { useState } from 'react'

const App = () => {
  const [adminLogin, setAdminLogin] = useState(false)
  const [userLogin, setUserLogin] = useState(false)

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    if (userToken) {
      setUserLogin(true)
    }
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken) {
      setAdminLogin(true)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{ adminLogin, setAdminLogin, userLogin, setUserLogin }}
    >
      <Switch>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/blog">
          <Protect>
            <Blog />
          </Protect>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/allblog">
          <Protect>
            <Allblog />
          </Protect>
        </Route>

        {/* admin panel => login, signup, category(CRUD) */}

        {/* <Header /> */}

        <Route path="/adminsign">
          <Adminsign />
        </Route>
        <Route path="/adminlogin">
          <Adminlogin />
        </Route>
        <Route path="/category">
          <AdminProtect>
            <Category />
          </AdminProtect>
        </Route>

        {/* <Route path="/blog">
          <Protect>
            <Blog />
          </Protect>
        </Route> */}
      </Switch>
    </UserContext.Provider>
  )
}

export default App
