import React, { useState, useEffect, useContext } from 'react'
import ProfilePosts from '../components/ProfilePosts'
import { useNavigate, useParams } from 'react-router-dom'
import { URL, IF } from '../UrlPath'
import axios from 'axios'
import { userContext } from '../contextApi/UserContext';
import Spinner from '../components/spinner'

const Profile = () => {

    const userId = useParams().id
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, setUser } = useContext(userContext)
    const [posts, setPosts] = useState([])
    const [updated, setUpdated] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()


    const fetchUser = async (e) => {
        e.prevent.Default()
        try {
            const res = await axios.get(URL + "/api/user/" + user.User.id)
            setUserName(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)

        } catch (error) {
            console.log(error)

        }

    }
    console.log(username)
    const fetchUserPosts = async () => {
        setSpinner(true)
        try {
            const res = await axios.get(URL + '/api/posts/user/' + userId)
            setPosts(res.data)
            setSpinner(false)


        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUser
    }, [userId])

    useEffect(() => {
        fetchUserPosts()

    }, [userId])



    const handleUpdate = async () => {
        setUpdated(false)
        try {
            const res = await axios.put(URL + "/api/user/" + user.User.id, { username, email, password }, { withCredentials: true })
            setUpdated(true)
            setUserName('')
            setEmail('')
            setPassword('')

        }
        catch (err) {
            console.log(err)
            setUpdated(false)
        }

    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(URL + "/api/user/" + user.User.id, { withCredentials: true })
            setUser(null)
            navigate("/")

        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div>

            {spinner ? <div className='d-flex justify-content-center ' style={{ marginTop: 200 }}><Spinner /> </div>
                : <div className='d-flex px-5 mt-3 flex-row'><div className='d-flex flex-column w-100'>
                    <h1 className="text-xl font-bold mb-4">Your posts:</h1>
                    {posts?.map((p) => (
                        <ProfilePosts key={p._id} p={p} />
                    ))}
                </div><div className='d-flex flex-column gap-3 mt-5 '>
                        <h1 className='fs-4'>Profile</h1>
                        <input onChange={e => setUserName(e.target.value)} value={username} className='outline-none px-4 py-2' placeholder='Your Username' type='text' />
                        <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none px-4 py-2' placeholder='Your Email' type='email' />
                        {/* <input onChange={e => setPassword(e.target.value)} className='outline-none px-4 py-2' placeholder='Your Password' type='password' /> */}
                        <div className='d-flex align-items-center mt-4 gap-3 me-5'>
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                        {updated && <h3 className="text-green fs-5 text-center mt-4">user updated successfully!</h3>}
                    </div>
                </div>}
        </div>
    )
}

export default Profile