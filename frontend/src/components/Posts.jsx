import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IF } from '../UrlPath'
import { userContext } from '../contextApi/UserContext';


const Posts = ({ post }) => {
  const { user } = useContext(userContext)
 
  return (
    <div className='d-flex mt-5  w-100  '>
      <div className='d-flex flex-column container-fluid' style={{ width: 700, height: 200, marginLeft: 250,marginRight:70 }}>
      <Link to={user ? `/posts/post/${post._id}` : '/login'}>
          <h3 className='col-sm-3 col-md-6'>{post.title}</h3>
        </Link>
        <div className='d-flex' >
          <p className='fw-4 fw-semibold '>@{post.username}</p>
          <div className='d-flex' style={{ marginLeft: 300 }}>
            <p className='fw-4 fw-semibold me-5'>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p className='fw-4 fw-semibold me-5'>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className='fs-5'>{post.desc.slice(0, 300) + " ...Read More"}</p>
      </div>
      <div className='d-flex justify-content-center bg-secondary' style={{ width: 250, height: 180 }}>
        <img src={IF + post.photo} className='img-fluid'/>
      </div>

    </div>
  )
}

export default Posts