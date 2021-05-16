import React, { useState } from 'react'
import Login from '../Login/Login'

function NewPassword(){

    const [match, setMatch] = useState(false)
    const [required, setRequired] = useState(false)

    return (
        <>
        <Login/>
        <div className="signUpContainer">
            <form className="signUpForm">
                <h5 className="upr" style={{display: required ? 'block' : 'none'}}>All fields required</h5>
                <h5 className="upr" style={{display: match ? 'block' : 'none'}}>Must match</h5>
                <div>
                    <label htmlFor="password" className="form-label">
                        <div className="labels">
                            <h3 className="dev1">New</h3>
                            <h3 className="dev2">password</h3>
                        </div>
                    </label>
                    <input type="password" className="form-control signupInput" spellCheck="false"/>
                </div>
                    <button className="signupBTN">Update</button>
            </form>
        </div>
        </>
    )
}

export default NewPassword