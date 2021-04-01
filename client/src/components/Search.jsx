import { useState, useRef } from 'react'
import axios from "axios";
import './styles.css'
import fetchJSON from '../util/API';

function Search() {

    const [searchResults, setSearchResults] = useState([])
    const inputRef = useRef()

    async function performSearch(){
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${inputRef.current.value}&orderBy=newest&langRestrict=en&maxResults=9`)
        setSearchResults(res.data.items)
        console.log(res.data.items[0].volumeInfo)
        console.log(searchResults)
    }

    function saveBook(res){
        fetchJSON('/api/books', 'post', res)
    }

    function renderDesc(book){
            if(!book.volumeInfo.description) return "(No description)";
            else return book.volumeInfo.description.slice(0,100) + "..."
    }

    function handleEnterKey(e) {
        if (e.key === "Enter") performSearch();
      }

        return (
            <>    
            <div className="searchContainer">
                <div className="searchBar">
                    <input placeholder="Search" ref={inputRef} onKeyDown={e=>handleEnterKey(e)}/>
                    <button className="searchBtn" onClick={performSearch}>Search</button>
                </div>
            </div>
    
            <div className="listBoxx">
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