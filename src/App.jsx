import { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
// import axios from 'axios'
import { LoginForm } from './components/loginForm'
// import Togglable from './components/togglable'
import Repos from './components/repos'
import { UpdateRepos } from './components/updateRepos'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  const handleUserChange = (newUser) => {
    setUser(newUser)
  }


  const logOut = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <div className='topNavBar'>
        <Link className="toolbarLink" to="/">Repos</Link>
        <Link className="toolbarLink" to="/update">Update Repos</Link>
        {
          user ?
            <b className="toolbarLogin" onClick={logOut}>Log out</b> :
            <Link className="toolbarLogin" to="/login">Log in</Link>
        }
      </div>

      {
        user ?
          <p style={{margin: '1rem'}}>User <b>{user.username}</b> is logged in.</p> :
          ''
      }

      <Routes>
        <Route path="/" element={<Repos />} />
        <Route path="/update"
          element= {
            user ?
              <UpdateRepos user={user} logOut={logOut}/> :
              <Navigate replace to="/login" />
          }
        />
        <Route path="/login" element={<LoginForm changeUser={handleUserChange}/>} />
      </Routes>
    </div>
  )
}

export default App