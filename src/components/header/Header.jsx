import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.css";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/popcorn.png";

const Header = () => {
  //states creating
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    //all new pages start showing top
    useEffect(()=>{
      window.scrollTo(0,0);
    },[location])

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        }
    }, []);

    const controlNavBar = () =>{
        if(window.scrollY > 200){
          if(window.scrollY > lastScrollY && !mobileMenu){
            setShow("hide")
          }else{
            setShow("show")
          }
          setLastScrollY(window.scrollY);
        }else{
          setShow("top");
        }
    }

    useEffect(()=>{
      window.addEventListener("scroll",controlNavBar)
      return ()=>{
        window.removeEventListener("scroll",controlNavBar)
      }
    },[lastScrollY])

    const openSearch = () =>{
      setMobileMenu(false);
      setShowSearch(true)
    }

    const openMobileMenu = () =>{
      setMobileMenu(true);
      setShowSearch(false)
    }

    const searchQueryHandler = (event)=>{
      //if user type search query and press enter, and search query not empty, then api call
      if(event.key === 'Enter' && query.length >0 ){
          navigate(`/search/${query}`);

          setTimeout(()=>{
            setShowSearch(false)
          },1000)
      }
    }

    const navigationHandler = (type) =>{
      if(type === "movie"){
        navigate('/explore/movie')
      }else{
        navigate('/explore/tv')
      }
      setMobileMenu(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
        setIsAuthenticated(false);
        setUsername('');
        setShowProfileMenu(false);
        navigate('/login');
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
          <ContentWrapper>
            <div className="logo" onClick={()=> navigate("/")}>
              <img src={logo} alt="" />
            </div>
            <ul className="menuItems">
                <li className="menuItem" onClick={() => navigate("/")}>
                    <AiFillHome />
                    <span>Home</span>
                </li>
                <li className="menuItem" onClick={() => {navigationHandler("movie")}}>Movies</li>
                <li className="menuItem" onClick={() => {navigationHandler("tv")}}>TV Shows</li>
                <li className="menuItem profile-item" onClick={() => isAuthenticated ? setShowProfileMenu(!showProfileMenu) : navigate("/login")}>
                    <CgProfile />
                    <span>{isAuthenticated ? username : 'Profile'}</span>
                    {showProfileMenu && isAuthenticated && (
                        <div className="profile-dropdown">
                            <div className="profile-info">
                                <span className="username">{username}</span>
                                <button className="logout-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    handleLogout();
                                }}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </li>
                <li className="menuItem">
                    <HiOutlineSearch onClick={openSearch}/>
                </li>
            </ul>

            <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch}/>
            {mobileMenu ? (<VscChromeClose onClick={()=>{setMobileMenu(false)}}/>) : (<SlMenu onClick={openMobileMenu}/>)} 
            </div>
          </ContentWrapper>
         { showSearch && <div className="searchBar">
            <ContentWrapper>
            <div className="searchInput">
              <input type="text" placeholder='Search for movie or TV show..' onChange={(e)=> setQuery(e.target.value)} onKeyUp={searchQueryHandler}/>
              <VscChromeClose onClick={()=>{setShowSearch(false)}}/>
            </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};

export default Header;