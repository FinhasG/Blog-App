import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../UrlPath'

const Registerpage = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null)
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleRegsiter = async (e) => {
        e.preventDefault()
        const data = {
            username,
            email,
            password
        }
        if (file) {
            const dataa = new FormData()
            const filename = Date.now() + file.name
            dataa.append("img", filename)
            dataa.append("file", file)
            data.photo = filename

            try {
                const imgupload = await axios.post(URL + "/api/upload", dataa)
                //console.log(imgupload.data)
            } catch (error) {
                console.log(error)
            }


        }
        try {
            await axios.post(URL + '/api/auth/register', data)
            setError(false);
            navigate('/login')
        } catch (error) {
            alert("Registration failed. Please try again later")
        }
    }


    return (
        <div className='mt-5'>
            <h1 className='text-center'>Register</h1>
            <form className=' form-group mx-auto col-4' onSubmit={handleRegsiter}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Username</label>
                    <input type="text" value={username} onChange={e => setUserName(e.target.value)} className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                </div>
                <input onChange={e => setFile(e.target.files[0])} type='file' className='py-4' />
                <button type="submit" className="btn btn-primary col-12 rounded-pill mt-2">Register</button>
                {error && <h4 className="text-danger fs-5">Something went wrong</h4>}
                <div className='text-center fs-5 text-secondary mt-2'>Already have an account? <Link to={"/login"}>Login</Link></div>

            </form>
        </div>
    )
}

export default Registerpage