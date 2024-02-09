import axios from 'axios'
const baseUrl = '/api/jobs'

const runJob = async (topicValue, token) => {
  const body = { topic: topicValue }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, body, config)
  return response.data
}

export default { runJob }