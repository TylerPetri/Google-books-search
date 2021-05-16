import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Login from '../Login/Login'

import './ForgotPassword.css'


function ForgotPasswordAuthPage(){

    const [required, setRequired] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const questionRef = useRef()
    const answerRef = useRef()

    async function requestAuth(){
        uprequire()
        upincorrect()
        console.log('test')
    }

    function uprequire(){
        setTimeout(()=>setRequired(false), 3000)
    }

    function upincorrect(){
        setTimeout(()=>setIncorrect(false), 3000)
    }

    return(
        <>
        <Login/>
        <div className="signUpContainer">
            <form className="signUpForm">
                <h5 className="upr" style={{display: required ? 'block' : 'none'}}>Answer required</h5>
                <h5 className="upr" style={{display: incorrect ? 'block' : 'none'}}>Incorrect</h5>
                <div>
                    <label className="form-label">
                        <div className="labels">
                            <h3 className="dev1">Ques</h3>
                            <h3 className="dev2">tion</h3>
                        </div>
                    </label>
                    <input type="text" className="form-control-plaintext questionArea" ref={questionRef} value="Question template" readOnly/>
                </div>
                <div>
                    <label htmlFor="password" className="form-label">
                        <div className="labels">
                            <h3 className="dev1">Ans</h3>
                            <h3 className="dev2">wer</h3>
                        </div>
                    </label>
                    <input type="password" className="form-control signupInput" ref={answerRef}/>
                </div>
                    <button className="signupBTN" onClick={requestAuth}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default ForgotPasswordAuthPage