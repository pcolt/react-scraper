import { useState } from 'react'
import { ButtonStyled } from '../styles/styledComponents'
import styled from 'styled-components'
import colors from '../styles/colors'

const TogglableDivStyled = styled.div`
  margin: 2rem;
  padding: 0.5rem;
  background-color: ${colors.secondary};
  border-radius: 8px;
`

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <TogglableDivStyled>
      <div style={hideWhenVisible}>
        <ButtonStyled onClick={toggleVisibility}>{props.buttonShowLabel}</ButtonStyled>
      </div>
      <div style={showWhenVisible} data-testid='togglableContent'>
        <ButtonStyled onClick={toggleVisibility}>{props.buttonHideLabel}</ButtonStyled>
        {props.children}
      </div>
    </TogglableDivStyled>
  )
}

export default Togglable