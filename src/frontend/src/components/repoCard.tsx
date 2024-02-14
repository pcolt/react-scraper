import githublogo from '../assets/github-mark.svg'
import styled from 'styled-components'
import { colors } from '../styles/styledComponents'

const RepoCardStyled = styled.div`
  margin: 2rem;
  padding: 0.5rem;
  background-color: ${colors.tertiary};
  border-radius: 8px;
`

const githubLogoStyle = {
  height: '1rem',
  paddingRight: '0.1rem'
}

export const RepoCard = ({ repo }) => {

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