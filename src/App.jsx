import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { RepoCard } from './components/repoCard'
import { LoginForm } from './components/loginForm'
import Togglable from './components/togglable'
import {compareByName, compareByStars, topics } from './services/helpers'
import { UpdateRepos } from './components/updateRepos'

const baseUrl = '/api/repos'

const App = () => {
  const [orderType, setOrderType] = useState(null)
  const [repos, setRepos] = useState([])
  const [sortedRepos, setSortedRepos] = useState([]) // new state variable
  const [repoSelected, setRepoSelected] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)


  const handleClickOrderByName = () => {
    setOrderType('name')
  }

  const handleClickOrderByStars = () => {
    setOrderType('stars')
  }

  const handleSelectRepo = event => {
    console.log(event.target.value)
    setRepoSelected(event.target.value)
  }

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

  useEffect(() => {   // whenever orderType changes 
    if (orderType === null) { return }

    console.log(`Reorder by ${orderType}`)
    let copyRepos = repos.slice()

    if (orderType === 'name') {
      setSortedRepos(copyRepos.sort(compareByName))
    } 
    if (orderType === 'stars') {
      setSortedRepos(copyRepos.sort(compareByStars))
    }
  }, [orderType, repos])

  useEffect(() => {   // whenever repoSelected changes 
    if (repoSelected === '') { return }

    console.log(`Display ${repoSelected}`)
    setOrderType(null)
    setSortedRepos([])

    axios
      .get(`${baseUrl}/${repoSelected}`).then(response => {
        console.log(`repos ${repoSelected} retrieved`)
        setRepos(response.data)
      }) 

  }, [repoSelected])

  return (
    <div>
      <h1>Repos</h1>
      <div>
        <h3>Select a topic to search:</h3>
        <select value={repoSelected} onChange={handleSelectRepo}>
          <option value='' disabled={true}>Select an option</option>
          {topics.map(topic => (
            <option key={topic.value} value={topic.value}>{topic.display}</option>
          ))}
        </select>
      </div>
      <div>
        <h3>Order by</h3>
        <button className={(orderType === 'name')? 'button-selected' : ''} onClick={handleClickOrderByName}>
          {(orderType === 'name') ? 'ordered' : 'order'} by Name
        </button>
        <button className={(orderType === 'stars')? 'button-selected' : ''} onClick={handleClickOrderByStars}>
          {(orderType === 'stars') ? 'ordered' : 'order'} by Stars
        </button>
      </div>
      <div>
        {(sortedRepos.length > 0 ? sortedRepos : repos).map(repo =>
          <RepoCard key={repo.id} repo={repo} />
        )}
      </div> 

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