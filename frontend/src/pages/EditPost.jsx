import React, { useState, useContext, useEffect } from 'react';
import { ImCross } from 'react-icons/im'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { URL } from '../UrlPath';
import { userContext } from '../contextApi/UserContext';



const EditPost = () => {
    const postId = useParams().id
    const [catagory, setCatagory] = useState('')
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState('')
    const { user } = useContext(userContext)
    const navigate = useNavigate()

    console.log(postId)
    const fecthPosts = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/" + postId)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setFile(res.data.file)
            setCategories(res.data.categories)
        } catch (error) {
            console.log(error)
        }

    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const updatedPost = {
            title,
            desc,
            username: user.User.username,
            userId: user.User.id,
            categories: categories
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("img", filename)
            data.append("file", file)
            updatedPost.photo = filename

            try {
                const imgupload = await axios.post(URL + "/api/upload", data)
                //console.log(imgupload.data)
            } catch (error) {
                console.log(error)
            }


        }

        try {
            const res = await axios.put(URL + "/api/posts/" + postId, updatedPost, { withCredentials: true })
            navigate('/posts/post/' + res.data._id)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        fecthPosts()
    }, [postId])


    const deleteCatagory = (idx) => {
        let allCategorie = [...categories]
        allCategorie.splice(idx)
        setCategories(allCategorie)
    }

    const addCategory = () => {
        //e.preventDefault()
        let allCatagories = [...categories]
        allCatagories.push(catagory)
        setCatagory("")
        setCategories(allCatagories)
    }


    return (
        <div className='px-5 mt-5'>
            <h1 fw-bold fs-2>Update a post</h1>
            <form className='w-100 d-flex flex-column column-gap-3 mt-4'>
                <input value={title} onChange={e => setTitle(e.target.value)} type='text' placeholder='Enter post title' className='px-4 py-2 outline-none ' />
                <input onChange={e => setFile(e.target.files[0])} type='file' className='py-4' />
                <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center gap-3'>
                        <input value={catagory} onChange={(e) => setCatagory(e.target.value)} className='py-3 px-4 ' placeholder='Enter post category' type='text' />
                        <div onClick={addCategory} role='button' className='bg-dark text-white px-4 py-3 fw-semibold cursor pointer'>Add</div>
                    </div>
                    <div className='d-flex px-4 mt-3'>
                        {categories?.map((cat, idx) => (
                            <div key={idx} className='d-flex justify-content-center align-items-center gap-2 me-4 px-2 py-1 rounded-3'>
                                <p className='fs-3'>{cat}</p>
                                <p onClick={deleteCatagory(idx)} className='text-white bg-dark rounded-pill p-1 ' role='button'><ImCross /></p>
                            </div>
                        ))}
                    </div>
                </div>
                <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder='Enter post description' class="form-control" id="exampleFormControlTextarea1" rows="10" column="10" className='px-4 py-2'></textarea>
                <button onClick={handleUpdate} className='bg-dark text-white w-100 mb-5 mt-3 p-2 fs-3 fw-semibold'>Update</button>
            </form>
        </div>
    )
}

export default EditPost