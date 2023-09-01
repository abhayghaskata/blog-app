import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Protect = (props) => {
  const history = useHistory()
  const [token, setToken] = useState('')
  useEffect(() => {
    let getToken = localStorage.getItem('userToken')
    if (!getToken) {
      return history.push('/')
    }
    setToken(getToken)
  }, [])
  if (!token) {
    return <div>...loading</div>
  }

  return props.children
}

export default Protect
