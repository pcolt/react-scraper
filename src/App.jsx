import { RepoCard } from './components/repoCard'

const App = ({ repos }) => {

  return (
    <div>
      <h1>Repos</h1>
      <div>
        {repos.map(repo =>
          <RepoCard key={repo.id} repo={repo} />
        )}
      </div>
    </div>
  )
}

export default App
