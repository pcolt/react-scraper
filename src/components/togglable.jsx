import { useState } from 'react'
import './tooglable.css'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='tooglable'>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonShowLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonHideLabel}</button>
        {props.children}
      </div>
    </div>
  )
}

export default Togglable