import { useRef } from 'react'
import { Link, Route } from 'react-router-dom';
import axios from "axios";
import { GiBookshelf } from 'react-icons/gi'
import { ImSearch } from 'react-icons/im'
import Search from '../Search/Search'
import Library from '../Library/Library'
import SignUp from '../Signup/Signup'
import Login from '../Login/Login'
import { useStoreContext } from '../../utils/GlobalStore'

import './Navbar.css'


function Navbar(props) {

    const [{nav, searchResults}, dispatch] = useStoreContext()
    const inputRef = useRef()

    async function performSearch(){
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${inputRef.current.value}&orderBy=newest&langRestrict=en&maxResults=9`)
        dispatch({type:'setSearchResults', data: {searchResults: res.data.items}})
        console.log(res.data.items[0].volumeInfo)
        console.log(searchResults)
    }

    function handleEnterKey(e) {
        if (e.key === "Enter") performSearch();
      }

    function toggleNav(){
        nav === false ? dispatch({type:"NAV_OPEN"}) : dispatch({type:"NAV_CLOSE"})
        props.toggleMenu()
        props.toggleOpa()
    }
    function closeNav(){
        props.closeNav()
    }

    return (
        <>
        <nav className="navbar flex-nowrap">
            <Link to="/" className="devLink">
            <h3 className="dev1">
                Google
            </h3>
            <h3 className="dev2">
                Books
            </h3>
            </Link>
            <div className="searchContainer">
                <input 
                    type="text" 
                    className="form-control mx-0 pb-2 searchInput" 
                    placeholder="Search"
                    ref={inputRef} onKeyDown={e=>handleEnterKey(e)}
                ></input>
                <Link to='/'>
                    <button type="submit" className="searchBtn" onClick={performSearch}>
                        <ImSearch className="btnIconSearch" />
                    </button>
                </Link>
            </div>
            <div className="navItemsCont">
                <Link to='/saved' className="navLink"><GiBookshelf/></Link><span className="libraryPopUp">My Library</span>
                <Login toggleNav={closeNav}/>
            </div>
        </nav>
        <div className="wrapper">
            <Route exact path='/' component={Search}/>
            <Route exact path='/saved' component={Library}/>
            <Route exact path='/signup' component={SignUp}/>
        </div>
        </>
    )
}

export default Navbar