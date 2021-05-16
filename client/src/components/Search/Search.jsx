import { useEffect, useState } from 'react'
import { useStoreContext } from '../../utils/GlobalStore'
import { GiBookshelf } from 'react-icons/gi'
import './Search.css'
import fetchJSON from '../../utils/API';
import noimg from '../../img/noimg.jpg'
import Login from '../Login/Login'

function Search() {

    const [{searchResults, username, log, saved}, dispatch] = useStoreContext()
    const [cleanup, setStop] = useState(false)
    const savedList = saved.map(a=>a.title)


    async function checkAuth(){
        const res = await fetchJSON('/api/books')
        if (res.message === "Auth failed") {
            dispatch({type:'LOG_FALSE'})
            localStorage.removeItem('usernameGoogleBooksTP')
            localStorage.removeItem('tokenGoogleBooksTP')
        } else if (cleanup) {
            return
        } else {
            dispatch({type:'SAVED_BOOKS', data: {saved: res}})
            setStop(true)
        }
    }

    useEffect(()=> {
        checkAuth()
        dispatch({type:'NO_REDIRECT'})
    }, [log, saved])

    function saveBook(res){
        fetchJSON('/api/books', 'post', {res, username})
        setStop(false)
        dispatch({type:'SAVED_BOOKS', data: {saved: [...saved, 'reload']}})
    }

    function renderDesc(book){
            if(!book.volumeInfo.description) return "(No description)";
            else return book.volumeInfo.description.slice(0,250) + "..."
    }

    function nodropdown(){
        dispatch({type:"CLOSE_DROPDOWN"})
    }
    
        return (
            <> 
            <Login/>
            <div className="listSearch" onClick={nodropdown}>
                    {/* <---list---> */}
                {searchResults.length > 0 ? searchResults.map( (book, idx) => {
                    return (
                        
                        <div key={idx} className="card">
                                <GiBookshelf className="saveBtn" onClick={()=>saveBook(book.volumeInfo)}  style={{color: savedList.includes(book.volumeInfo.title) ? 'rgb(175, 120, 69)' : 'black'}}/>
                                {savedList.includes(book.volumeInfo.title) ? <div className="saveBtnPopUp">Already in library</div> : <div className="saveBtnPopUp">Add to library</div>}
                                {book.volumeInfo.imageLinks ? 
                                <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail || ''} className="thumbnailImg" alt="thumbnail"/>
                                :
                                <img className="nothumbnailImg" src={noimg} alt="not available"/>
                                }
                                
                            <div className="title">{book.volumeInfo.title}</div>
                            <div className="desc" ><p>{renderDesc(book)}</p></div>
                            <a href={book.volumeInfo.previewLink} target="_blank" rel="noreferrer" className="linkBtn">
                                 <h5>View details on Google page</h5>
                            </a>
                        </div>
                    )
                })
                :
                    <h2 className="noResults">No results found</h2>
                }
            </div>
            </>
        )
    }
    
    export default Search