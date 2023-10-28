import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../UrlPath'
import {userContext} from '../contextApi/UserContext';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(userContext)


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true })
                .then((res) => {
                    setUser(res.data)
                    localStorage.setItem("blog-user", JSON.stringify(res.data));
                })
            setRedirect(true);

        } catch (e) {
            alert("Login failed");
        }

    }

    if (redirect) {
        navigate('/')
    }

    
    return (
        <div className='mt-5'>
            <h1 className='text-center'>Login</h1>
            <form className=' form-group mx-auto col-4' onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary col-12 rounded-pill mt-2">Login</button>
                <div className='text-center fs-5 text-secondary mt-2'>I don't have an account?  <Link to={"/register"}>Register</Link></div>
            </form>
        </div>
    )
}

export default LoginPage