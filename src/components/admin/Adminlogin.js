import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { useContext } from 'react'

const Adminlogin = () => {
  const data = useContext(UserContext)
  const history = useHistory()
  const [loginemail, setLoginEmail] = useState('')
  const [loginpassword, setLoginPassword] = useState('')

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(`http://localhost:3001/adminlog`, {
        username: loginemail,
        password: loginpassword,
      })
      localStorage.setItem('adminToken', res.data.token)
      data.setAdminLogin(true)
      setLoginEmail('')
      setLoginPassword('')
      localStorage.removeItem('userToken')
      data.setUserLogin(false)
      return history.push('/category')
    } catch (error) {
      console.log('error>>>>', error)
    }
  }

  const handleKeyDown = (key) => {
    if (key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="my-10">
      <div className="max-w-xl mx-auto rounded-xl shadow-2xl bg-[#3874cb] ">
        <div className="py-10">
          <div className="text-center text-white text-2xl font-medium">
            Admin Login
          </div>
          <div className="flex w-1/2 mx-auto flex-col my-6">
            <label htmlFor="" className="text-white">
              Email
            </label>
            <input
              value={loginemail}
              type="email"
              onKeyDown={(e) => handleKeyDown(e.key)}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="rounded-lg px-3 py-2 outline-none"
            />
          </div>
          <div className="flex w-1/2 mx-auto flex-col">
            <label htmlFor="" className="text-white">
              Password
            </label>
            <input
              type="password"
              onKeyDown={(e) => handleKeyDown(e.key)}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <p
            className="text-black hover:underline flex w-1/2 mx-auto flex-col my-4 cursor-pointer"
            onClick={() => {
              history.push('/adminsign')
            }}
          >
            SignUp
          </p>

          <div className="flex justify-center my-6">
            <button
              className="bg-white px-4 py-2 font-bold  text-[#3874cb] rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminlogin
