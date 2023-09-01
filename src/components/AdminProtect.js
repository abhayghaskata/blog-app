import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Siderbar from './admin/Siderbar'

const AdminProtect = (props) => {
  const history = useHistory()
  const [token, setToken] = useState('')
  useEffect(() => {
    let getToken = localStorage.getItem('adminToken')
    if (!getToken) {
      return history.push('/')
    }
    setToken(getToken)
  }, [])
  if (!token) {
    return <div>...loading</div>
  }

  return (
    <>
      <Siderbar />
      {props.children}
    </>
  )
}

export default AdminProtect
