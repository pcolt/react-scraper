import {compareByName, compareByStars, topics } from '../services/helpers'
import { useEffect, useState } from 'react'
import { RepoCard } from './repoCard'
import axios from 'axios'


const Repos = () => {
  const [orderType, setOrderType] = useState(null)
  const [repos, setRepos] = useState([])
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

  const reposToDisplay = () => {
    if (orderType === null) { return repos }

    console.log(`Reorder by ${orderType}`)
    let copyRepos = repos.slice()

    if (orderType === 'name') {
      return copyRepos.sort(compareByName)
    }
    if (orderType === 'stars') {
      return copyRepos.sort(compareByStars)
    }
  }
  const reposDisplayed = reposToDisplay()

  useEffect(() => {   // whenever repoSelected changes
    if (repoSelected === '') { return }

    console.log(`Display ${repoSelected}`)
    setOrderType(null)
    // setSortedRepos([])

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
        <select id="topic-select" value={repoSelected} onChange={handleSelectRepo}>
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
        {reposDisplayed.map(repo =>
          <RepoCard key={repo.id} repo={repo} />
        )}
      </div>
    </div>
  )
}

export default Repos