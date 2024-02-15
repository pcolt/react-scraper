import {compareByName, compareByStars, topics } from '../services/helpers'
import { useEffect, useState } from 'react'
import { RepoCard } from './repoCard'
import axios from 'axios'
import styled from 'styled-components'
import { ButtonSelectedStyled, ButtonStyled } from '../styles/styledComponents'
import { colors } from '../styles/styledComponents'
import { RepoOredrType } from '../types'
import { RepoType } from '../types'

const DisplayReposDiv = styled.div`
  margin: 2rem;
  padding: 2rem;
  background-color: ${colors.secondary};
  border-radius: 8px;
`

const Repos = () => {
  const [orderType, setOrderType] = useState<RepoOredrType | null>(null)
  const [repos, setRepos] = useState<RepoType[]>([])
  const [repoSelected, setRepoSelected] = useState('')

  const baseUrl = '/api/repos'

  const handleClickOrderByName = () => {
    setOrderType('name')
  }

  const handleClickOrderByStars = () => {
    setOrderType('stars')
  }

  const handleSelectRepo = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    <DisplayReposDiv>
      <h2>Repos</h2>
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
        {
          orderType === 'name' ?
            <ButtonSelectedStyled onClick={handleClickOrderByName}>orderd by Name</ButtonSelectedStyled> :
            <ButtonStyled onClick={handleClickOrderByName}>order by Name</ButtonStyled>
        }
        {
          orderType === 'stars' ?
            <ButtonSelectedStyled onClick={handleClickOrderByStars}>orderd by Stars</ButtonSelectedStyled> :
            <ButtonStyled onClick={handleClickOrderByStars}>order by Stars</ButtonStyled>
        }
      </div>
      <div>
        {
          reposDisplayed ? 
          reposDisplayed.map(repo =>
            <RepoCard key={repo.id} repo={repo} />
          ) :
          <p>Select a repo</p>
        }
      </div>
    </DisplayReposDiv>
  )
}

export default Repos