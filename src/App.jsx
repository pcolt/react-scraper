import { useEffect, useState } from 'react'
import { RepoCard } from './components/repoCard'
import {compareByName, compareByStars } from './helpers/mainHelpers'
import axios from 'axios'

const baseUrl = `/api/repos`

const App = () => {
  const [orderType, setOrderType] = useState('name')
  const [repos, setRepos] = useState([])

  const handleClickOrderType = () => {
    (orderType === "stars") ? setOrderType("name") : setOrderType("stars")
  }

  useEffect(() => {
      axios
        .get(baseUrl).then(response => {
          console.log('repos retrieved')
          setRepos(response.data)
        })
    
  },[])

  useEffect(() => {   // whenever orderType changes 
    console.log(`Reorder by ${orderType}`)

    if (orderType === "name") {
      repos.sort( compareByName )
    } 
    if (orderType === "stars") {
      repos.sort( compareByStars )
    }
  }, [orderType])

  return (
    <div>
      <h1>Repos about 'climatechange'</h1>
      <div>
        <button onClick={handleClickOrderType}>
          order by {orderType}
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
