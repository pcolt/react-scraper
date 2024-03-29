import githublogo from '../assets/github-mark.svg'
import styled from 'styled-components'
import { colors } from '../styles/styledComponents'
import { RepoType } from '../types'

const RepoCardStyled = styled.div`
  margin: 2rem 2rem 2rem 0rem;
  padding: 2rem;
  background-color: ${colors.secondary};
  color: ${colors.tertiary};
  border-radius: 8px;
`

export const RepoCard = ({ repo }: {repo: RepoType}) => {

  return (
    <RepoCardStyled>
      <h2>{repo.repoName}</h2>
      <p data-testid='repoCardDescription'>{repo.description}</p>
      <a href={repo.url}>
        <img style={{height: '1rem', paddingRight: '0.1rem'}} src={githublogo} />
        GitHub
      </a>
      <p>Stars &#11088; {repo.stars}</p>
    </RepoCardStyled>
  )
}