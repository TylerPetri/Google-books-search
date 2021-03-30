import {Link} from 'react-router-dom';
import './navbar.css'

function Navbar() {
    return (
        <nav className="nav">
        <div className="dev">
            Google Books
        </div>
        <div className="nav-items">
            <Link to='/' className="nav-link">Search</Link>
            <Link to='/saved' className="nav-link">Saved</Link>
        </div>
    </nav>
    )
}

export default Navbar