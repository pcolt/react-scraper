import loginService from '../services/login'
import { useState } from 'react'
import { Notification } from './notification'
import './loginForm.css'

export const LoginForm = ({
  setUser,
  errorMessage,
  setErrorMessage,
  setToken
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 

  const baseUrl = '/api/login'

  const handleLogin = async (event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)  

    try { 
      const user = await loginService.login({        
        username, password,      
      })      
      setUser(user)
      setToken(user.token)      
      setUsername('')      
      setPassword('')
    } catch (exception) {      
      setErrorMessage('Wrong credentials')      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)    
    }
  }

  return (
    <div>
      <form className="formLogin" onSubmit={handleLogin}>
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />

        <button type="submit">Login</button>

        <Notification message={errorMessage} />

      </form> 
    </div>
  )     
}