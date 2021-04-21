import { Link, Route } from 'react-router-dom';
import './Navbar.css'
import { GiBookshelf } from 'react-icons/gi'
import { ImSearch } from 'react-icons/im'
import Search from '../Search/Search'
import Library from '../Library/Library'
import SignUp from '../Signup/Signup'
import Login from '../Login/Login'
import { useStoreContext } from '../../utils/GlobalStore'

function Navbar(props) {

    const [{nav}, dispatch] = useStoreContext()

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
                ></input>
                <Link to='/'>
                    <button type="submit" className="searchBtn">
                        <ImSearch className="btnIconSearch" />
                    </button>
                </Link>
            </div>
            <div className="navItemsCont">
                <Link to='/saved' className="navLink"><GiBookshelf/></Link><span className="libraryPopUp">My Library</span>
                <Login toggleNav={closeNav}/>
            </div>
        </nav>
        <Route exact path='/' component={Search}/>
        <Route exact path='/saved' component={Library}/>
        <Route exact path='/signup' component={SignUp}/>
        </>
    )
}

export default Navbar