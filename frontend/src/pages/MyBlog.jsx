import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Posts from '../components/Posts';
import { URL } from '../UrlPath';
import { Link, useLocation } from 'react-router-dom';
import { userContext } from '../contextApi/UserContext';
import Spinner from '../components/spinner';

const MyBlog = () => {

    const { search } = useLocation()
    const [posts, setPosts] = useState([])
    const { user } = useContext(userContext)
    const [noResults, setNoResults] = useState(false)
    const [spinner, setSpinner] = useState(false)


    const fetchPosts = async () => {
        setSpinner(true)
        try {
            await axios.get(URL + "/api/posts/user/" + user.User.id)
                .then((res) => {
                    setPosts(res.data)
                    if (res.data.length === 0) {
                        setNoResults(true)
                    } else {
                        setNoResults(false)
                    }
                    setSpinner(false)
                })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [search])



    return (
        <div className='px-6'>
            {spinner ? <div className='d-flex justify-content-center ' style={{marginTop:200}}><Spinner /> </div> : !noResults ?
                posts.map((post) => (
                    <>
                        <Link to={user ? `/posts/post/${post._id}` : '/login'}> </Link>
                        <Posts key={post._id} post={post} />

                    </>
                )) : <h1 className='text-center mt-5 text-secondary'>No posts found</h1>
            }
        </div >
    )
}

export default MyBlog