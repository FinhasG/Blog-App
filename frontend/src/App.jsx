import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PostDetails from './pages/postDetails.jsx';
import Header from './components/Header.jsx';
import CreatePost from './pages/CreatePost.jsx';
import EditPost from './pages/EditPost.jsx';
import Profile from './pages/Profile.jsx';
import MyBlog from './pages/MyBlog.jsx';
import {ContextProvider, userContext} from './contextApi/UserContext.jsx'
import { useContext, useEffect } from 'react';

function App() {
  const {user, setUser} = useContext(userContext);

  useEffect(() => {
    if (!user) {
      const userData = JSON.parse(localStorage.getItem("blog-user"));
      setUser(userData);
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/write' element={<CreatePost/>} />
        <Route path='/posts/post/:id' element={<PostDetails />}/>
        <Route path='/edit/:id' element={<EditPost/>} />
        <Route path='/profile/:id' element={<Profile/>} />
        <Route path='/myblogs/:id' element={<MyBlog/>} />
      </Routes>
  </>
  )
}

export default App
