import styled from 'styled-components'
import { colors } from '../styles/styledComponents'

// styled component
const NotifiyErrStyled = styled.div`
  font-weight: 500;
  padding: 1rem;
  color: ${colors.tertiary};
  background-color: rgb(228, 114, 114);
  border-radius: 8px;
`

export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <NotifiyErrStyled>
      {message}
    </NotifiyErrStyled>
  )
}