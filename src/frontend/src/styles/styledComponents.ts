import { createGlobalStyle, styled } from 'styled-components'

export const colors = {
  background: 'black', 
  primary: '#33332d',     // dark gray
  secondary: 'gray', 
  tertiary: '#f9f9f9'     // light-gray
}

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color: ${colors.tertiary};
    background-color: ${colors.background};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  a {
    font-weight: 500;
    color: ${colors.tertiary};
  }
  a:hover {
    color: ${colors.secondary};
  }

  body {
    margin: 0;
    display: block;
    min-width: 320px;
    min-height: 100vh;
  }

  select {
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
  }

  input[type=text], input[type=password] {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    margin: 0.5rem 0.5rem;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    /* cursor: pointer; */
  }
`

export const ButtonStyled = styled.button`
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

export const ButtonSelectedStyled = styled(ButtonStyled)`
  border-color: ${colors.primary};
  border-width: 0.2rem;
`