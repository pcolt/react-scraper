function compareByName( a, b ) {
  if ( a['repoName'].toLowerCase() < b['repoName'].toLowerCase() ){
    return -1
  }
  if ( a['repoName'].toLowerCase() > b['repoName'].toLowerCase() ){
    return 1
  }
  return 0
}

function compareByStars( a, b ) {
  if ( a.stars > b.stars ){
    return -1
  }
  if ( a.stars < b.stars ){
    return 1
  }
  return 0
}

const topics = [
  {
    display: 'Crawler',
    value: 'crawler'
  },
  {
    display: 'Climate Change',
    value: 'climatechange'
  }
]

export { compareByName, compareByStars, topics }