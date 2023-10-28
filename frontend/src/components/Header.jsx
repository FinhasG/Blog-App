import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { URL, IF } from '../UrlPath'
import axios from 'axios';
import { userContext } from '../contextApi/UserContext';
import { BsSearch } from 'react-icons/Bs'
import spinner from './spinner';

const Header = () => {
    const { user, loading } = useContext(userContext)
    const { setUser } = useContext(userContext)
    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true })
            setUser(null);
            localStorage.removeItem("blog-user");

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <header className="  p-3 text-bg-dark ">
            <div className="container-fluid">
                {user ?
                    <div className='d-flex align-items-center'>
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onKeyUp={() => navigate(search ? "?search=" + search : navigate("/"))} >
                            <input onChange={e => setSearch(e.target.value)} type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" style={{width:250, marginRight: 250 }}/>
                        </form>
                        <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"  >
                            <ul className='d-flex' style={{ marginRight: 400 }}>
                                <li className="nav-link px-3 text-white fs-4 "><Link to={'/'} >Blogs</Link></li>
                                <li className="nav-link px-2 text-white fs-4"><Link to={'/myblogs/' + user.User.userId}>My Blog</Link></li>
                                <li className="nav-link px-3 text-white fs-4"><Link to={'/profile/' + user.User.id}>Profile</Link></li>
                                <li className="nav-link px-3 text-white fs-4 "><Link to={'/write'}>Write</Link></li>
                            </ul>
                        </div>
                        <div className='d-flex  align-items-center'>
                            <Link to={'/profile/' + user.User.id}><img className=' rounded-pill ' role="button" style={{ width: 50, height: 40 }} src={IF + user.User.photo} /></Link>
                            <Link to={'/'}><button onClick={handleLogout} type="button" className="btn btn-secondary ms-3" >Logout</button></Link>
                        </div>
                    </div>
                    : <div className='d-flex flex-wrap justify-content-between '>
                        <h3 className=' mb-lg-0'><Link to={'/'}>Blog</Link></h3>
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onKeyUp={() => navigate(search ? "?search=" + search : navigate("/"))}>
                            <input onChange={e => setSearch(e.target.value)} type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
                        </form>
                        <div className="d-flex">
                            <Link to={'/login'}> <button type="button" className="btn btn-outline-light me-3">Login</button></Link>
                            <Link to={'/register'}><button type="button" className="btn btn-warning">Sign-up</button></Link>
                        </div>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header