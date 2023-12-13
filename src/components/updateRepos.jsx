import runJobService from '../services/runJob'
import { useState } from 'react'
import { topics } from '../services/helpers'
import { ButtonStyled } from '../styles/buttonStyled'
import styled from 'styled-components'
import { colors } from '../styles/global'

const UpdReposDivStyled = styled.div`
  margin: 2rem;
  padding: 2rem;
  background-color: ${colors.secondary};
  border-radius: 8px;
`

// import axios from 'axios'

// const baseUrl = '/api/jobs'

export const UpdateRepos = ({
  user,
  logOut
}) => {
  const [messageSent, setMessageSent] = useState(null)
  const [dateMsgSent, setDateMsgSent] = useState('')

  const runCrawlerJob = async (topicValue) => {
    console.log('Button pressed:', topicValue)

    try {
      const response = await runJobService.runJob(topicValue, user.token)
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
      // changeUser(null)
      // changeToken(null)
      logOut()
    }
  }

  return (
    <UpdReposDivStyled>
      <h2>Update repos</h2>
      <h3>Run crawler by topic</h3>
      {topics.map(topic => (
        <ButtonStyled key={topic.value} onClick={() => runCrawlerJob(topic.value)} data-testid={topic.btnRunTestId}>
          {topic.display}
        </ButtonStyled>
      ))}
      {(messageSent) ? <p>{dateMsgSent} - New scraping job for topic <b>{messageSent}</b></p> : ''}
    </UpdReposDivStyled>
  )
}
