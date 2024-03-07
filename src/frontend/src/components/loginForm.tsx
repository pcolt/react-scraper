import { useState } from 'react'
import { Notification } from './notification'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonStyled } from '../styles/styledComponents'
import { colors } from '../styles/styledComponents'
import { User } from '../types'

import loginService from '../services/login' // Import the LoginService type from the login module

// styled components
const FormLoginStyled = styled.form`
  margin: 2rem;
  padding: 2rem;
  background-color: ${colors.primary};
  border-radius: 8px;
`

export const LoginForm = ({
  changeUser
}: {
  changeUser: (user: User) => void
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      changeUser(user)
      setUsername('')
      setPassword('')

      navigate('/update')

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div style={{marginTop: '2rem'}}>
      <FormLoginStyled onSubmit={handleLogin}>
        <h2>Login</h2>
        <div style={{display: 'block'}}>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={{display: 'block'}}>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <ButtonStyled id="login-button" type="submit">Login</ButtonStyled>

        <Notification message={errorMessage} />

      </FormLoginStyled>
    </div>
  )
}
