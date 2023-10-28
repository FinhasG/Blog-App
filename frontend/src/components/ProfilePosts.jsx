import React from 'react'
import { Link } from 'react-router-dom'
import { IF } from '../UrlPath'

const ProfilePosts = ({ p }) => {
    return (
        <div className='d-flex mt-5  w-100  '>
            <div className='d-flex flex-column justify-content-start' style={{ width: 600, height: 200, marginLeft: 50,marginRight:70 }}>
                <h2>{p.title}</h2>
                <div className='d-flex' >
                    <p className='fw-4 fw-semibold'>@{p.username}</p>
                    <div className='d-flex' style={{ marginLeft: 150 }}>
                        <p className='fw-4  fw-semibold me-5'>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
                        <p className='fw-4 fw-semibold me-5'>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
                    </div>
                </div>
                <p className='fs-5'>{p.desc.slice(0, 200) + " ...Read More"}</p>
            </div>
            <div className='d-flex justify-content-center bg-secondary' style={{ width: 180, height: 170 }}>
                <img src={IF + p.photo}></img>
            </div>

        </div>
    )
}

export default ProfilePosts