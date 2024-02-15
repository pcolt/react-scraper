import axios from 'axios'
import { TopicEnum } from '../types'

const baseUrl = '/api/jobs'

const runJob = async (topicValue: TopicEnum, token: string) => {
  const body = { topic: topicValue }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, body, config)
  return response.data
}

export default { runJob }