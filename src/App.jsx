import { useEffect, useState } from 'react'
// import axios from 'axios'
import { LoginForm } from './components/loginForm'
import Togglable from './components/togglable'
import Repos from './components/repos'
import { UpdateRepos } from './components/updateRepos'

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

      <Repos></Repos>

      {
        user === null
          ?
          <Togglable buttonShowLabel='Show login' buttonHideLabel='Hide login'>
            <LoginForm user={user} changeUser={handleUserChange} />
          </Togglable>
          :
          <UpdateRepos user={user} logOut={logOut}></UpdateRepos>
      }

    </div>
  )
}

export default App