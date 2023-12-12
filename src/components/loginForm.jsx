import loginService from '../services/login'
import { useState } from 'react'
import { Notification } from './notification'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// styled components
const FormLoginStyled = styled.form`
  margin: 2rem;
  padding: 2rem;
  background-color: #cbd9e8;
  border-radius: 8px;
`

export const LoginForm = ({
  changeUser
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (event) => {
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

        <button id="login-button" type="submit">Login</button>

        <Notification message={errorMessage} />

      </FormLoginStyled>
    </div>
  )
}
