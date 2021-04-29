import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import Login from '../Login/Login'
import noimg from '../../img/noimg.jpg'

import { useStoreContext } from '../../utils/GlobalStore'
import fetchJSON from '../../utils/API'

import './Library.css'

function Saved() {

const [{log, noEntry}, dispatch] = useStoreContext()
const [cleanup, setStop] = useState(false)
const [bookList, setBookList] = useState([])

async function loadBooks() {
    const data = await fetchJSON('/api/books');
    if(data.message === 'Auth failed') {
        localStorage.removeItem('usernameGoogleBooksTP')
        localStorage.removeItem('tokenGoogleBooksTP')
        dispatch({type: 'LOG_FALSE'})
    } else if (cleanup) {
        return
    }
    else {
        setBookList(data)
        setStop(true)
    }
}

useEffect(function(){
    loadBooks()
}, [bookList, log])

function deleteBook(idx){
    fetchJSON(`/api/books/${idx}`, 'delete')
    setStop(false)
    setBookList([...bookList, 'reload'])
}

function renderDesc(book){
    if(!book.description) return "(No description)";
    else return book.description.slice(0,250) + "..."
}


    return (
        <>
        {noEntry ? <Redirect to='/'/> : null}
        <Login/>
        <div className="listLibrary">
            { bookList.length > 0 ? bookList.filter(a=>a!=='reload').map( (book,idx)=> {
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
                {log ? 
                    <h2 className="intro">No books in this library yet</h2>
                :
                    <h2 className="intro">Must be signed in to view library</h2>
                }
                
                </>
                } 
        </div>
        </>
    )
}

export default Saved