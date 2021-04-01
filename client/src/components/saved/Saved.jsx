import { useState, useEffect } from 'react'
import './saved.css'
import fetchJSON from '../../util/API'
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
    console.log(idx)
}

function renderDesc(book){
    if(!book.description) return "(No description)";
    else return book.description.slice(0,100) + "..."
}


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
            
            { bookList.length > 0 ? bookList.map( (book,idx)=> {
                return(
                    <div key={idx} className="card">
                            <button className="cardBtn" onClick={()=>deleteB(book._id)}>Delete</button>
                            <a href={book.link} target="_blank" rel="noreferrer">
                                <button className="cardBtn">View</button>
                            </a>
                            <img src={book.image || ''} alt="thumbnail" style={{width:'100%'}}/>
                        <div className="title">{book.title}</div>
                        <div className="authors">{book.authors.map((names, idx) => {return (<div key={idx} className="authorsN">{names.name}</div>)})}</div>
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
        </div>
        </>
    )
}

export default Saved