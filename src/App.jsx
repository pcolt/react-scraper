const RepoComponent = ({ repo }) => {

  return (
    <li>{repo.repoName}</li>
  )
}

const App = ({ repos }) => {

  return (
    <div>
      <h1>Repos</h1>
      <ul>
        {repos.map(repo =>
          <RepoComponent key={repo.id} repo={repo} />
        )}
      </ul>
    </div>
  )
}

export default App
