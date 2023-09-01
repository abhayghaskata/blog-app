import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import CancelIcon from '@mui/icons-material/Close'

const Category = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [data, setData] = useState([])

  const allCategory = async (e) => {
    try {
      const res = await axios.get(`http://localhost:3001/alldata`)
      console.log('category>>>', res.data.data)
      setData(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allCategory()
  }, [])

  const handlestore = async () => {
    try {
      if (!name || !image) {
        throw new Error('Please fill fields')
      }
      let formData = new FormData()
      formData.append('name', name)
      formData.append('image', image)
      let token = localStorage.getItem('adminToken')
      const res = await axios.post(`http://localhost:3001/adddata`, formData, {
        headers: { token: token },
      })
      allCategory()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  console.log('setname', name)

  const handleDelete = async (id) => {
    try {
      console.log(id)
      let token = localStorage.getItem('adminToken')
      await axios.delete(`http://localhost:3001/deletedata/${id}`, {
        headers: { token: token },
      })
      allCategory()
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <div>
      <div className="my-10">
        <div className="max-w-xl mx-auto rounded-xl shadow-2xl bg-[#3874cb] ">
          <div className="py-10">
            <div className="text-center text-white text-2xl font-medium">
              category
            </div>
            <div className="flex w-1/2 mx-auto flex-col my-6">
              <label htmlFor="" className="text-white">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
              {/* <p className="text-red-500 font-semibold">{emailError}</p> */}
            </div>
            <div className="flex w-1/2 mx-auto flex-col">
              <label htmlFor="" className="text-white">
                File
              </label>
              <input
                type="file"
                className="rounded-lg px-3 py-2 outline-none"
                onChange={(evt) =>
                  evt.target.files && evt.target.files.length
                    ? setImage(evt.target.files[0])
                    : ''
                }
              />
              {/* <p className="text-red-500 font-semibold">{passwordError}</p> */}
            </div>

            <div className="flex justify-center my-6">
              <button
                className="bg-white px-4 py-2 font-bold  text-[#3874cb] rounded-lg"
                onClick={handlestore}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 max-w-4xl mx-auto justify-center items-center my-10 gap-5">
          {data.map((el, key) => {
            return (
              <div
                key={key}
                className=" relative bg-blue-900 w-auto text-white  rounded-[30px] border border-[#007CFA33] md:mb-10 hover:shadow-xl pb-5  hover:translate-y-1 hover:duration-1000"
              >
                <div
                  className="absolute bg-red-500 rounded-full hover:duration-1000 h-7 w-7 hover:bg-red-300 top-3 right-2"
                  onClick={() => handleDelete(el._id)}
                >
                  <CancelIcon />
                </div>
                <img
                  alt=""
                  className="h-44 w-full rounded-t-[30px]"
                  src={'http://localhost:3001/images/' + el.image}
                />

                <div className="flex flex-row	items-center	justify-center">
                  <div className="flex justify-center items-center font-bold text-lg h-24 w-24 px-5 bg-white hover:bg-gray-400 hover:shadow-2xl hover:translate-y-1 hover:duration-1000 rounded-full m-5">
                    {/* <img alt="" src={e.location.name} /> */}
                    <div className="text-black">{el.name}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Category
