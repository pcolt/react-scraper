import { useEffect, useState, React } from 'react'
import { RepoCard } from './components/repoCard'
import {compareByName, compareByStars } from './helpers/mainHelpers'
import axios from 'axios'

const baseUrl = '/api/repos'

const App = () => {
  const [orderType, setOrderType] = useState('stars')
  const [repos, setRepos] = useState([])
  const [repoSelected, setRepoSelected] = useState('climatechange')

  useEffect(() => {
    axios
      .get(`${baseUrl}/${repoSelected}`).then(response => {
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

  const handleSelectRepo = event => {
    console.log(event.target.value)
    setRepoSelected(event.target.value)
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

  useEffect(() => {   // whenever orderType changes 
    console.log(`Display ${repoSelected}`)

    axios
      .get(`${baseUrl}/${repoSelected}`).then(response => {
        console.log('repos crawler retrieved')
        setRepos(response.data)
      }) 

  }, [repoSelected])

  return (
    <div>
      <h1>Repos</h1>
      <div>
        <h3>Select a topic to search:</h3>
        <select value={repoSelected} onChange={handleSelectRepo}>
          <option value="climatechange">Climate Change</option>
          <option value="crawler">Crawler</option>
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
        {repos.map(repo =>
          <RepoCard key={repo.id} repo={repo} />
        )}
      </div>
    </div>
  )
}

export default App
