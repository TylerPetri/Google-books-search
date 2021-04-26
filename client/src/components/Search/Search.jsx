import { useStoreContext } from '../../utils/GlobalStore'
import { GiBookshelf } from 'react-icons/gi'
import './Search.css'
import fetchJSON from '../../utils/API';
import noimg from '../../img/noimg.jpg'
import Login from '../Login/Login'

function Search() {

    const [{searchResults, username, token}] = useStoreContext()

    function saveBook(res){
        fetchJSON('/api/books', 'post', res)
    }

    function renderDesc(book){
            if(!book.volumeInfo.description) return "(No description)";
            else return book.volumeInfo.description.slice(0,250) + "..."
    }

    function test(){
        console.log(username, token)
    }

        return (
            <> 
            <Login/>
            {/* <button onClick={test}>test username</button> */}
            <div className="listSearch">
                    {/* <---list---> */}
                {searchResults.length > 0 ? searchResults.map( (book, idx) => {
                    return (
                        
                        <div key={idx} className="card">
                                <GiBookshelf className="saveBtn" onClick={()=>saveBook(book.volumeInfo)}/>
                                <div className="saveBtnPopUp">Add to library</div>
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