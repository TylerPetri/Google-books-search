import { Link, Route } from 'react-router-dom';
import './Navbar.css'
import { AiOutlineSearch } from 'react-icons/ai'
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
            <h3 className="dev">
                Google Books
            </h3>
            <div className="searchContainer">
                <input 
                    type="text" 
                    className="form-control mx-0 searchInput" 
                    placeholder="Search"
                ></input>
                <Link to='/'>
                    <button type="submit" className="searchBtn">
                        <AiOutlineSearch/>
                    </button>
                </Link>
            </div>
            <div className="nav-items flex-nowrap">
                <Link to='/saved' className="nav-link">My Library</Link>
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