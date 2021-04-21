import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import Login from '../Login/Login'
import noimg from '../../img/noimg.jpg'

import { useStoreContext } from '../../utils/GlobalStore'
import fetchJSON from '../../utils/API'

import './Library.css'

function Saved() {

const [{log}] = useStoreContext()
const [bookList, setBookList ] = useState([])

async function loadBooks() {
    const data = await fetchJSON('/api/books');
    setBookList(data)
}

useEffect(function(){
    if(log) loadBooks()
}, [])

function deleteBook(idx){
    fetchJSON(`/api/books/${idx}`, 'delete')
}

function renderDesc(book){
    if(!book.description) return "(No description)";
    else return book.description.slice(0,250) + "..."
}


    return (
        <>
        {!log ? <Redirect to='/'/> : null}
        <Login/>
        <div className="listLibrary">
            { bookList.length > 0 ? bookList.map( (book,idx)=> {
                return (
                    <div key={idx} className="card">
                            <MdDelete className="saveBtn" onClick={()=>deleteBook(book._id)}/>
                            <div className="saveBtnPopUp">Remove from library</div>
                            {book.image ? 
                            <img src={book.image} className="thumbnailImg" alt="thumbnail"/>
                            :
                            <img className="nothumbnailImg" src={noimg} alt="no image available"/>
                            }
                            
                        <div className="title">{book.title}</div>
                        <div className="desc" ><p>{renderDesc(book)}</p></div>
                        <a href={book.link} target="_blank" rel="noreferrer" className="linkBtn">
                                <h5>View details on Google page</h5>
                        </a>
                    </div>
                    )
                })
                : 
                <>
                <br></br>
                <h2 className="intro">No books in this library yet</h2>
                </>
                } 
        </div>
        </>
    )
}

export default Saved