import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Allblog = () => {
  const [title, setTitle] = useState([])
  const [description, setDescription] = useState([])
  const [img, setImg] = useState([])
  const [category, setCategory] = useState('')
  const copy = img
  // const [name,setName] = useState([])
  // const [name,setName] = useState([])
  // const [name,setName] = useState([])
  // const [name,setName] = useState([])

  const [options, setOptions] = useState([])

  const allBlogs = async (e) => {
    try {
      const res = await axios.get(`http://localhost:3001/alldata`)
      // console.log('category>>>', res.data.data)
      setOptions(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    allBlogs()
  }, [])

  const handleSubmit = async () => {
    console.log('Title>>>>', title)
    console.log('description>>>>', description)
    console.log('img>>>>', img)
    console.log('category>>>>', category)

    try {
      if (!title || !description) {
        throw new Error('Please fill fields')
      }
      let formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('image', img)
      let token = localStorage.getItem('userToken')
      const res = await axios.post(`http://localhost:3001/blogadd`, formData, {
        headers: { token: token },
      })
      allBlogs()
      setTitle('')
      setDescription('')
      setImg('')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="max-w-xl mx-auto  my-10 rounded-xl bg-[#3874cb]">
        <div className="flex justify-center flex-col py-12 w-1/2 mx-auto">
          {/* <div>
            <img src="" alt="" />
          </div> */}
          <div className="flex flex-col my-2">
            <label htmlFor="" className="text-white ">
              Title
            </label>
            <textarea
              name=""
              id=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              cols="30"
              rows="2"
              placeholder="Add Title"
              className=" outline-none p-3"
            ></textarea>
          </div>

          <div className="flex flex-col my-2">
            <label
              className=" text-white "
              htmlFor=""
              placeholder="enter your description"
            >
              Textarea
            </label>
            <textarea
              name=""
              id=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="5"
              placeholder="Enter your description"
              className=" outline-none p-3"
            ></textarea>
          </div>

          <div className="flex flex-col my-2">
            <label htmlFor="" className="text-white ">
              Images
            </label>
            {/* <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Drop your link"
              className=" outline-none p-3"
            ></textarea> */}

            <input
              type="file"
              onChange={(evt) =>
                evt.target.files && evt.target.files.length
                  ? setImg(evt.target.files[0])
                  : ''
              }
              accept="image/*"
            />
          </div>
          <div className="flex flex-col my-2">
            <label
              className=" text-white "
              htmlFor=""
              placeholder="enter your description"
            >
              Select Your Category
            </label>
            <select
              onChange={(event) => setCategory(event.target.value)}
              className="outline-none py-1"
              value={category}
            >
              <option>Please choose one option</option>
              {options.map((option, index) => {
                return (
                  <option key={index} value={option._id}>
                    {option.name}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="flex flex-col my-2">
            <button
              className="text-white font-semibold px-3 py-2 bg-black rounded-lg w-1/3 mx-auto hover:text-[#3874cb]"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <div>
            <img src={copy} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allblog
