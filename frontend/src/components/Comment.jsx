import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { userContext } from '../contextApi/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import {URL} from '../UrlPath';

const comments = ({ c, post }) => {
    const { user } = useContext(userContext)

    const deleteComment= async(id)=>{
        try {
            const res=await axios.delete(URL + "/api/comments/"+id,{withCredentials:true})
            window.location.reload(true)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='d-flex flex-column mt-4'>
            <div className='px-2 py-2 bg-primary-subtle rounded-3'>
                <div className='d-flex align-items-center justify-content-between'>
                    <h3 className='fs-4'>@{c.author}</h3>
                    <div className='d-flex gap-4 align-items-center'>
                        <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                        <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>

                    </div>
                </div >
                <div className='d-flex justify-content-between mb-0 pt-3 '>
                    <p className='px-4 mt-2'>{c.comment}</p>
                    {user?.User.id === c?.userId ?
                        <div className='d-flex gap-2 align-items-center'>
                            <p className='fs-3 'role="button" onClick={()=>deleteComment(c._id)}><MdDelete /></p>
                        </div> : ""}
                </div>
            </div>


        </div>
    )
}

export default comments