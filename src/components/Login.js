import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'

const Login = () => {
  const data = useContext(UserContext)
  console.log(data)
  const history = useHistory()
  const [loginemail, setLoginEmail] = useState('')
  const [loginpassword, setLoginPassword] = useState('')

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(`http://localhost:3001/login`, {
        username: loginemail,
        password: loginpassword,
      })
      localStorage.setItem('userToken', res.data.token)
      data.setUserLogin(true)
      setLoginEmail('')
      setLoginPassword('')
      localStorage.removeItem('adminToken')
      data.setAdminLogin(false)
      return history.push('/blog')
    } catch (error) {
      console.log(error)
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
            Login
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
            {/* <p className="text-red-500 font-semibold">{emailError}</p> */}
          </div>
          <div className="flex w-1/2 mx-auto flex-col">
            <label htmlFor="" className="text-white">
              Password
            </label>
            <input
              type="password"
              value={loginpassword}
              onKeyDown={(e) => handleKeyDown(e.key)}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="rounded-lg px-3 py-2 outline-none"
            />
            {/* <p className="text-red-500 font-semibold">{passwordError}</p> */}
          </div>

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

export default Login
