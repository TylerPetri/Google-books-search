import { useState, useEffect } from 'react'
import './Library.css'
import fetchJSON from '../../utils/API'
// import { Redirect } from 'react-router-dom'


function Saved() {

const [bookList, setBookList ] = useState([])


async function loadBooks() {
    const data = await fetchJSON('/api/books');
    // console.log(data.message)
    // if(data.message === "Auth failed"){return <Redirect to="/login"/>}
    // else {
        setBookList(data) 
    // }
   
}

useEffect(function(){
    loadBooks()
}, [])

function deleteB(idx){
    fetchJSON(`/api/books/${idx}`, 'delete')
}

function renderDesc(book){
    if(!book.description) return "(No description)";
    else return book.description.slice(0,100) + "..."
}


    return (
        <>
        <div className="intro">
            <h3>Saved books</h3>
        </div>

        <div className="listLibrary">
                {/* <---list---> */}
            
            { bookList.length > 0 ? bookList.map( (book,idx)=> {
                return(
                    <div key={idx} className="card">
                            <button className="cardBtn" onClick={()=>deleteB(book._id)}>Delete</button>
                            <a href={book.link} target="_blank" rel="noreferrer">
                                <button className="cardBtn">View</button>
                            </a>
                            <div className="imgAut">
                                <img src={book.image || ''} alt="thumbnail"/>
                                <div className="authors"><h5>Authors</h5>{book.authors.map((names, idx) => {return (<div key={idx} className="authorsN">{names.name}</div>)})}</div>
                            </div>
                        <div className="title">{book.title}</div>
                        <div className="desc">{renderDesc(book)}</div>
                    </div>
                    )}
                    
                ) 
                : 
                <>
                <br></br>
                <h2>No saved books</h2>
                </>
                } 
        </div>
        </>
    )
}

export default Saved