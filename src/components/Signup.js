import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Signup = () => {
  const [name, setName] = useState([])
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])

  const onsubmitHandle = (e) => {
    axios
      .post(`http://localhost:3001/signup`, {
        username: name,
        useremail: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    // if (loginemail && loginpassword) {
    localStorage.setItem('signname', name)
    localStorage.setItem('signemail', email)
    localStorage.setItem('signpassword', password)
    setEmail('')
    setPassword('')
    setName('')
    // }
  }

  return (
    <div>
      <div className="my-10">
        <div className="max-w-xl mx-auto rounded-xl shadow-2xl bg-[#3874cb] ">
          <div className="py-10">
            <div className="text-center text-white text-2xl font-medium">
              SignUp
            </div>
            <div className="flex w-1/2 mx-auto flex-col my-6">
              <label htmlFor="" className="text-white">
                Name
              </label>
              <input
                value={name}
                type="name"
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
              {/* <p className="text-red-500 font-semibold">{emailError}</p> */}
            </div>
            <div className="flex w-1/2 mx-auto flex-col my-6">
              <label htmlFor="" className="text-white">
                Email
              </label>
              <input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
              {/* <p className="text-red-500 font-semibold">{passwordError}</p> */}
            </div>

            <div className="flex justify-center my-6">
              <button
                className="bg-white px-4 py-2 font-bold  text-[#3874cb] rounded-lg"
                onClick={onsubmitHandle}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
