import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useStoreContext } from '../../utils/GlobalStore'
import Login from '../Login/Login'

function NewPassword(){

    const [{tempUser}, dispatch] = useStoreContext()
    const [required, setRequired] = useState(false)
    const [error, setError] = useState(false)
    const passRef = useRef()
    let history = useHistory()

    async function changePassword(e){
        e.preventDefault()

        const data = {
            username: tempUser,
            password: passRef.current.value
        }

        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                token: localStorage.getItem('googlebooksapi9000temp')
            }
        }
        fetchOptions.body = JSON.stringify(data)

        const res = await fetch('/newpassword', fetchOptions).then(r=>r.json())
        if (res.message === 'User updated') {
            dispatch({type:"TEMP_USER", data: {tempUser: ""}})
            localStorage.removeItem('googlebooksapi9000temp')
            history.push('/')
        } else if (res.message === 'Password required!'){
            setRequired(true)
            upreq()
        } else {
            setError(true)
            passRef.current.value = ''
            uperr()
        }
    }

    function upreq(){
        setTimeout(()=> setRequired(false), 3000)
    }

    function uperr(){
        setTimeout(()=> setError(false), 3000)
    }

    return (
        <>
        <Login/>
        <div className="signUpContainer">
            <form className="signUpForm">
                <h5 className="upr" style={{display: required ? 'block' : 'none'}}>Password required</h5>
                <h5 className="upr" style={{display: error ? 'block' : 'none'}}>Something went wrong... Try again later</h5>
                <div>
                    <label htmlFor="password" className="form-label">
                        <div className="labels">
                            <h3 className="dev1">New</h3>
                            <h3 className="dev2">password</h3>
                        </div>
                    </label>
                    <input type="password" className="form-control signupInput" spellCheck="false" ref={passRef}/>
                </div>
                    <button className="signupBTN" onClick={changePassword}>Update</button>
            </form>
        </div>
        </>
    )
}

export default NewPassword