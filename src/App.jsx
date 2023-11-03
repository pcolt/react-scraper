import { useEffect, useState, React } from 'react'
import { RepoCard } from './components/repoCard'
import {compareByName, compareByStars } from './helpers/mainHelpers'
import axios from 'axios'

const baseUrl = '/api/repos'

const App = () => {
  const [orderType, setOrderType] = useState('stars')
  const [repos, setRepos] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl).then(response => {
        console.log('repos retrieved')
        setRepos(response.data)
      })
    
  },[])

  const handleClickOrderByName = () => {
    setOrderType('name')
  }

  const handleClickOrderByStars = () => {
    setOrderType('stars')
  }

  useEffect(() => {   // whenever orderType changes 
    console.log(`Reorder by ${orderType}`)
    let copyRepos = repos.slice()

    if (orderType === 'name') {
      setRepos(copyRepos.sort( compareByName ))
    } 
    if (orderType === 'stars') {
      setRepos(copyRepos.sort( compareByStars ))
    }
  }, [orderType])

  return (
    <div>
      <h1>Repos</h1>
      <div>
        <button className={(orderType === 'name')? 'button-selected' : ''} onClick={handleClickOrderByName}>
          {(orderType === 'name') ? 'ordered' : 'order'} by Name
        </button>
        <button className={(orderType === 'stars')? 'button-selected' : ''} onClick={handleClickOrderByStars}>
          {(orderType === 'stars') ? 'ordered' : 'order'} by Stars
        </button>
      </div>
      <div>
        {repos.map(repo =>
          <RepoCard key={repo.id} repo={repo} />
        )}
      </div>
    </div>
  )
}

export default App
