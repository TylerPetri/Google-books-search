import { useEffect, useState, useRef } from 'react'
import axios from "axios";
import './search.css'

function Search() {

    const [searchResults, setSearchResults] = useState([])
    const inputRef = useRef()

    async function performSearch(){
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${inputRef.current.value}&orderBy=newest&langRestrict=en&maxResults=9`)
        setSearchResults(res.data.items)
        console.log(res.data.items[0].volumeInfo.imageLinks.smallThumbnail)
        console.log(searchResults)
    }

        return (
            <>    
            <div className="searchContainer">
                <div className="searchBar">
                    <input placeholder="Search" ref={inputRef}></input>
                    <button className="searchBtn" onClick={performSearch}>Search</button>
                </div>
            </div>
    
            <div className="listBox">
                    {/* <---list---> */}
                {searchResults.map( (book, idx) => {
                    return (
                        <div key={idx} className="card">
                            <div className="title">{book.volumeInfo.title}</div>
                            <img src={book.volumeInfo.imageLinks} width='100px;'/>
                            <div>{book.volumeInfo.previewLink}</div>
                            <div className="desc">{book.volumeInfo.description}</div>
                        </div>
                    )
                })}
            </div>
            </>
        )
    }
    
    export default Search