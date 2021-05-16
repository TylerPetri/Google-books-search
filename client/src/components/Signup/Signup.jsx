import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Login from '../Login/Login'
import './Signup.css'


function SignUpPage(){

    const [required, setRequired] = useState(false)
    const [exists, setExists] = useState(false)
    const userRef = useRef()
    const passRef = useRef()
    const questionRef = useRef()
    const answerRef = useRef()
    let history = useHistory()

    async function signup(e){
        e.preventDefault()

        const data = {
            username: userRef.current.value,
            password: passRef.current.value,
            question: questionRef.current.value,
            answer: answerRef.current.value,
        }

        const fetchOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
          }
          fetchOptions.body = JSON.stringify(data)
        
        const res = await fetch('/signup', fetchOptions).then(r=>r.json())
        if(res.error || res.message === "Password required") {
            setRequired(true)
            uprequire()
        } else if (res.message === "User exists") {
            setExists(true)
            taken()
        } else {
            history.push('/')
        }
    }

    function uprequire(){
        setTimeout(()=>setRequired(false), 3000)
    }

    function taken(){
        setTimeout(()=>setExists(false), 3000)
    }

    return(
        <>
        <Login/>
        <div className="signUpContainer">
            <form className="signUpForm">
                <h5 className="upr" style={{display: required ? 'block' : 'none'}}>All fields required</h5>
                <h5 className="upr" style={{display: exists ? 'block' : 'none'}}>Username already taken</h5>
                <div>
                    <label htmlFor="username" className="form-label">
                        <div className="labels">
                            <h3 className="dev1">User</h3>
                            <h3 className="dev2">name</h3>
                        </div>
                    </label>
                    <input className="form-control signupInput" ref={userRef} spellCheck="false"/>
                </div>
                <div>
                    <label htmlFor="password" className="form-label">
                        <div className="labels">
                            <h3 className="dev1">Pass</h3>
                            <h3 className="dev2">word</h3>
                        </div>
                    </label>
                    <input type="password" className="form-control signupInput" ref={passRef} spellCheck="false"/>
                </div>
                <div>
                    <label htmlFor="password" className="form-label">
                        <div className="labels">
                            <h3 className="dev1">Secret </h3>
                            <h3 className="dev2">Question</h3>
                        </div>
                    </label>
                    <input className="form-control signupInput" ref={questionRef} spellCheck="false"/>
                </div>
                <div>
                    <label htmlFor="password" className="form-label">
                        <div className="labels">
                            <h3 className="dev1">Ans</h3>
                            <h3 className="dev2">wer</h3>
                        </div>
                    </label>
                    <input type="password" className="form-control signupInput" ref={answerRef} spellCheck="false"/>
                </div>
                    <button className="signupBTN" onClick={signup}>Sign up</button>
            </form>
        </div>
        </>
    )
}

export default SignUpPage