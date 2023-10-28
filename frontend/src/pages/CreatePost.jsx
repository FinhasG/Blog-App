import React, { useContext, useState, } from 'react';
import {useNavigate} from 'react-router-dom'
import { ImCross } from 'react-icons/im';
import { URL } from '../UrlPath';
import {userContext} from '../contextApi/UserContext'
import axios from 'axios';

const CreatePost = () => {
    const [catagory, setCatagory] = useState('');
    const [catagories, setCatagories] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState('')
    const { user } = useContext(userContext)
    const navigate=useNavigate()


    const deleteCatagory = (idx) => {
        let allCatagorie = [...catagories]
        allCatagorie.splice(idx)
        setCatagories(allCatagorie)
    }

    const newCatagory = () => {
        //e.preventDefault()
        let allCatagories = [...catagories]
        allCatagories.push(catagory)
        setCatagory("")
        setCatagories(allCatagories)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        const newPost = {
            title,
            desc,
            username: user.User.username,
            userId: user.User.id,
            categories: catagories
        }
        if (file) {
            const data =new FormData()
            const filename = Date.now() + file.name
            data.append("img", filename)
            data.append("file", file)
            newPost.photo = filename

            try {
                const imgupload = await axios.post(URL + "/api/upload", data)
            } catch (error) {
                console.log(error)
            }


        }
        try{
            const res=await axios.post(URL + "/api/posts/create",newPost,{withCredentials:true})
           navigate('/posts/post/'+ res.data._id)
            console.log(res.data)
        }catch(error){
            console.log(error)
        }

    }

    return (
        <div className='px-5 mt-5'>
            <h1 className='fw-bold fs-2'>Create a post</h1>
            <form className='w-100 d-flex flex-column column-gap-3 mt-4'>
                <input value={title} onChange={e => setTitle(e.target.value)} type='text' placeholder='Enter post title' className='px-4 py-2 outline-none ' />
                <input onChange={e => setFile(e.target.files[0])} type='file' className='py-4' />
                <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center gap-3'>
                        <input value={catagory} onChange={(e) => setCatagory(e.target.value)} className='py-3 px-4 ' placeholder='Enter post category' type='text' />
                        <div onClick={newCatagory} role='button' className='bg-dark text-white px-4 py-3 fw-semibold cursor pointer'>Add</div>
                    </div>
                    <div className='d-flex px-4 mt-3'>
                        {catagories?.map((cat, idx) => (
                            <div key={idx} className='d-flex justify-content-center align-items-center gap-2 me-4 px-2 py-1 rounded-3'>
                                <p className='fs-3'>{cat}</p>
                                <p onClick={deleteCatagory} className='text-white bg-dark rounded-pill p-1 ' role='button'><ImCross /></p>
                            </div>
                        ))}
                    </div>
                </div>
                <textarea onChange={e => setDesc(e.target.value)} placeholder='Enter post description' className="form-control px-4 py-2" id="exampleFormControlTextarea1" rows="10" column="10"></textarea>
                <button onClick={handleCreate} className='bg-dark text-white w-100 mb-5 mt-3 p-2 fs-3 fw-semibold'>Create</button>
            </form>
        </div>
    )
}

export default CreatePost