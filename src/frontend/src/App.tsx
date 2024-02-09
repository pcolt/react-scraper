import { SetStateAction, useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
// import axios from 'axios'
import { LoginForm } from './components/loginForm'
// import Togglable from './components/togglable'
import Repos from './components/repos'
import { UpdateRepos } from './components/updateRepos'
import { colors } from './styles/styledComponents'
import styled from 'styled-components'

const TopNavBarStyled = styled.div`
  background-color: ${colors.primary};
  overflow: hidden;
  width: 100%;
  padding-top: 1rem;
`

const RouterLinkStyled = styled(Link)`
  text-decoration: none;
  padding-left: 1rem;
  color: ${colors.tertiary};
  font-size: 1.2em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
`

const TopNavBarLogoutStyled = styled.a`
  text-decoration: none;
  color: ${colors.tertiary};
  font-size: 1.2em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
`

const App = () => {
  const [user, setUser] = useState(null)

  const handleUserChange = (newUser: SetStateAction<null>) => {
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
      <TopNavBarStyled>
        <RouterLinkStyled to="/">Repos</RouterLinkStyled>
        <RouterLinkStyled to="/update" id="link-update-repos">Update Repos</RouterLinkStyled>
        <div style={{float: 'right', paddingRight: '1rem'}}>
          {
            user ?
              <TopNavBarLogoutStyled onClick={logOut}>Log out</TopNavBarLogoutStyled> :
              <RouterLinkStyled to="/login">Log in</RouterLinkStyled>
          }
        </div>
      </TopNavBarStyled>

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