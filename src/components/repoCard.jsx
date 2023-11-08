import './repoCard.css'
import githublogo from '../assets/github-mark.svg'
export const RepoCard = ({ repo }) => {

  return (
    <div className="repoCard">
      <h2>{repo.repoName}</h2>
      <p>{repo.description}</p>
      <a href={repo.url}><img className="logo" src={githublogo} />GitHub</a>
      <p>Stars &#11088; {repo.stars}</p>
    </div>
  )
}