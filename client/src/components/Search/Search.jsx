import { useStoreContext } from '../../utils/GlobalStore'
import './Search.css'
import fetchJSON from '../../utils/API';

function Search() {

    const [{searchResults}, dispatch] = useStoreContext()

    function saveBook(res){
        fetchJSON('/api/books', 'post', res)
    }

    function renderDesc(book){
            if(!book.volumeInfo.description) return "(No description)";
            else return book.volumeInfo.description.slice(0,100) + "..."
    }

    function test(){
        console.log(searchResults)
    }

        return (
            <>    
            <div className="listSearch">
                    {/* <---list---> */}
                {searchResults.length > 0 ? searchResults.map( (book, idx) => {
                    return (
                        <div key={idx} className="card">
                                <button className="cardBtn" onClick={()=>saveBook(book.volumeInfo)}>Save</button>
                                <a href={book.volumeInfo.previewLink} target="_blank" rel="noreferrer">
                                    <button className="cardBtn">View</button>
                                </a>
                                <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail || ''} alt="thumbnail"/>
                            <div className="title">{book.volumeInfo.title}</div>
                            <div className="desc" >{renderDesc(book)}</div>
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