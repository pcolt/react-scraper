import runJobService from '../services/runJob'
import { useState } from 'react'
import { topics } from '../services/helpers'
// import axios from 'axios'

// const baseUrl = '/api/jobs'

export const UpdateRepos = ({ 
  user,
  setUser, 
  token,
  setToken 
}) => {
  const [messageSent, setMessageSent] = useState(null)
  const [dateMsgSent, setDateMsgSent] = useState('') 

  const runCrawlerJob = async (topicValue) => {    
    console.log('Button pressed:', topicValue)  

    try {
      const response = await runJobService.runJob(topicValue, token) 
      // const body = { topic: topicValue }
      // const config = {
      //   headers: { Authorization: `Bearer ${token}` }
      // }
      // const response = await axios.post(baseUrl, body, config) 
      console.log(response.message)
      setMessageSent(topicValue)
      const date = new Date()
      setDateMsgSent(date.toLocaleString()) 

    } catch (exception) {      
      console.log('Error:', exception) 
      setUser(null) 
      setToken(null)
    }
  }

  return (
    <div>
      <h1>Update repos</h1>
      <h3>Run crawler by topic</h3>
      {topics.map(topic => (
        <button key={topic.value} onClick={() => runCrawlerJob(topic.value)}>{topic.display}</button>
      ))}
      {(messageSent) ? <p>{dateMsgSent} - New scraping job for topic <b>{messageSent}</b></p> : ''}
      <p><b>{user.username}</b> is logged</p>
    </div>
  )     
}
