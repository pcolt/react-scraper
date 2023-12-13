import styled from 'styled-components'
import { colors } from './global'

const ButtonStyled = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  margin: 0.5rem 0.5rem;
  color: ${colors.primary};
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: ${colors.tertiary};
  cursor: pointer;
  transition: border-color 2s;
  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`

const ButtonSelectedStyled = styled(ButtonStyled)`
  border-color: ${colors.primary};
  border-width: 0.2rem;
`


export { ButtonStyled, ButtonSelectedStyled }
