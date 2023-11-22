import {compareByName, compareByStars, topics } from '../services/helpers'
import { useEffect, useState } from 'react'
import { RepoCard } from './repoCard'
import axios from 'axios'


const Repos = () => {
  const [orderType, setOrderType] = useState(null)
  const [repos, setRepos] = useState([])
  const [sortedRepos, setSortedRepos] = useState([]) // new state variable
  const [repoSelected, setRepoSelected] = useState('')

  const baseUrl = '/api/repos'

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
    </div>
  )
}

export default Repos