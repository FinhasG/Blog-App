import React, { useContext, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Comment from '../components/Comment';
import { useParams, useNavigate } from 'react-router-dom';
import { URL, IF } from '../UrlPath';
import axios from 'axios';
import { userContext } from '../contextApi/UserContext';
import Spinner from '../components/spinner'
//import {IF} from '../UrlPath'


const postDetails = () => {

  const postId = useParams().id
  //console.log(postId)
  const [post, setPost] = useState({})
  const { user } = useContext(userContext)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate()



  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + '/api/posts/' + postId)
      setPost(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  const deletePost = async () => {
    try {
      const res = await axios.delete(URL + '/api/posts/' + postId, { withCredentials: true })
      console.log(res.data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }


  const fetchPostComment = async () => {
    setSpinner(true)
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId)
      console.log(res.data)
      setComments(res.data)
      setSpinner(false)
    } catch (error) {
      setSpinner(true)
      console.log(error)
    }

  }

  useEffect(() => {
    fetchPostComment()
  }, [postId])

  const postComment = async (e) => {
    e.preventDefault()
    try {
     const res = await axios.post(URL + '/api/comments/create', {comment: comment,author: user.User.username, postId: postId,userId: user.User.id},{withCredentials:true})
          window.location.reload(true)

    } catch (error) {
    console.log(error)
  }
}
return (

  <div className='container mt-2  w-75'>
    <div className='d-flex justify-content-between align-items-center text-center '>
      <h1 className='fs-1 text-black '>{post.title}</h1>
      {user?.User.id === post?.userId && <div className='d-flex align-items-center justify-content-center'>
        <p onClick={() => navigate('/edit/' + postId)} className='btn btn-outline-primary px-3 fs-2 me-4'><BiEdit /></p>
        <p onClick={deletePost} className='btn btn-outline-danger px-3 fs-2'><MdDelete /></p>
      </div>}
    </div>
    <div className='d-flex align-items-center justify-content-between mt-2'>
      <p>@{post.username}</p>
      <div className='d-flex justify-content-center gap-4'>
        <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
        <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
      </div>
    </div>
    <img src={IF + post.photo} alt='image' style={{ width: 1100, height: 500 }} />
    <p className='mt-4'>{post.desc}</p>
    <div className='d-flex  gap-4 fw-semibold align-items-center'>
      <p className='fs-5'>Categories:</p>
      <div className='d-flex gap-2  justify-content-center'>
        {post.categories?.map((cat, i) => (
          <div key={i} className='rounded-4  align-items-center px-3 py-1 bg-primary-subtle'>{cat}</div>
        ))}
      </div>
    </div>
    <div className='d-flex flex-column mt-4'>
      <h3 className='mt-3 mb-3 fs-4 fw-semibold'>Comments:</h3>
      {comments?.map((c)=>(
        <Comment key={c._id} c={c} post={post} />
      ))}

    </div>
    <div className='d-flex flex-column w-100'>
      <input  onChange={e => setComment(e.target.value)} type='text' placeholder='Write a comment' className='px-4 py-2 mt-4  mb-2' />
      <button onClick={postComment} className='bg-dark fs-3 text-white px-3 py-1 h-25 mb-5'>Add Comment</button>
    </div>
  </div>
)

}

export default postDetails