import { RepoType, TopicObjType, TopicEnum } from '../types'

function compareByName( a: RepoType, b: RepoType ) {
  if ( a['repoName'].toLowerCase() < b['repoName'].toLowerCase() ){
    return -1
  }
  if ( a['repoName'].toLowerCase() > b['repoName'].toLowerCase() ){
    return 1
  }
  return 0
}

function compareByStars( a: RepoType, b: RepoType ) {
  if ( a.stars > b.stars ){
    return -1
  }
  if ( a.stars < b.stars ){
    return 1
  }
  return 0
}

const topics: TopicObjType[] = [
  {
    display: 'Crawler',
    value: TopicEnum.Crawler,
    btnRunTestId: 'btnRunTestCrawler'
  },
  {
    display: 'Climate Change',
    value: TopicEnum.ClimateChange,
    btnRunTestId: 'btnRunTestClimateChange'
  }
]

export { compareByName, compareByStars, topics }