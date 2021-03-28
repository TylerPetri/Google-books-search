import { useState, useEffect } from 'react'
import './saved.css'

function Saved() {

const [bookList, setBookList ] = useState([])

// function loadBooks() {

// }


    return (
        <>
        <nav className="nav">
            <div className="dev">
                Google Books
            </div>
            <div className="nav-items">
                <a className="nav-link">Search</a>
                <a className="nav-link">Saved</a>
            </div>
        </nav>

        <div className="intro">
            <h1>(React) Google Books Search</h1>
            <h4>Search for and Save books of Internet</h4>
        </div>

        <div className="listBox">
            <h6>Saved books</h6>
            <div className="list">
                {/* <---list---> */}
                <div className="books"></div>
            </div>
        </div>
        </>
    )
}

export default Saved