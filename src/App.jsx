import { useEffect, useState } from 'react'
// import axios from 'axios'
import { LoginForm } from './components/loginForm'
import Togglable from './components/togglable'
import Repos from './components/repos'
import { UpdateRepos } from './components/updateRepos'

const App = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const handleUserChange = (newUser) => {
    setUser(newUser)
  }

  const handleTokenChange = (newToken) => {
    setToken(newToken)
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
    setToken(null)
  }

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')    
    if (loggedUserJSON) {    
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      setToken(user.token)    
    }  
  }, [])

  return (
    <div>

      <Repos></Repos>

      {
        user === null 
          ? 
          <Togglable buttonShowLabel='Show login' buttonHideLabel='Hide login'>
            <LoginForm user={user} changeUser={handleUserChange} changeToken={handleTokenChange}/> 
          </Togglable>
          : 
          <UpdateRepos user={user} token={token} logOut={logOut}></UpdateRepos>
      }
      
    </div>
  )
}

export default App