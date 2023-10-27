import './repoCard.css'
export const RepoCard = ({ repo }) => {

    return (
      <div className="repoCard">
        <h2>{repo.repoName}</h2>
        <p>{repo.description}</p>
        <a href="{repo.url}">GitHub</a>
        <p>Stars &#11088; {repo.stars}</p>
      </div>
    )
  }