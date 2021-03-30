import { useState, useEffect } from 'react'
import './saved.css'
import fetchJSON from '../../util/API'

function Saved() {

const [bookList, setBookList ] = useState([])


async function loadBooks() {
    const data = await fetchJSON('/api/books');
    setBookList(data)    
}

useEffect(function(){
    loadBooks()
}, [])


    return (
        <>
        <div className="intro">
            <h1>(React) Google Books Search</h1>
            <h4>Search for and Save books of Internet</h4>
        </div>

        <div className="listBox">
            <h6>Saved books</h6>
            <div className="list">
                {/* <---list---> */}
            {bookList.map( (book,idx)=> {
                return(
                    <ul key={idx}className="books">
                        <li>{book.title}</li>
                        <li>{book.description}</li>
                    </ul>
                    )}
                )}
            </div>
        </div>
        </>
    )
}

export default Saved