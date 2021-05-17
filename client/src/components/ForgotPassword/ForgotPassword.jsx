import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useStoreContext } from '../../utils/GlobalStore'
import Login from '../Login/Login'

import './ForgotPassword.css'


function ForgotPasswordAuthPage(){

    const [{tempUser}, dispatch] = useStoreContext()
    const [required, setRequired] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [auth, setAuth] = useState(false)
    const [show, setShow] = useState(false)
    const [question, setQuestion] = useState("")
    const userRef = useRef()
    const questionRef = useRef()
    const answerRef = useRef()
    let history = useHistory()

    async function requestQuestion(e){
        e.preventDefault()

        const data = {
            username: userRef.current.value,
        }

        const fetchOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
          }
          fetchOptions.body = JSON.stringify(data)
        
        const res = await fetch('/questionReq', fetchOptions).then(r=>r.json())
        if (res.message === 'No such being!') {
            userRef.current.value = ''
            setAuth(true)
            upAuth()
        } else {
            setQuestion(res.message)
            dispatch({type:"TEMP_USER", data: {tempUser: userRef.current.value}})
            setShow(true)
        }
    }

    async function requestAuth(e){
        e.preventDefault()

        const data = {
            username: tempUser,
            question: question,
            answer: answerRef.current.value
        }

        const fetchOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'}
        }
        fetchOptions.body = JSON.stringify(data)

        const res = await fetch('/answerAuth', fetchOptions).then(r=>r.json())
        if (res.message === 'No such being!') {
            setAuth(true)
            upAuth()
        } else if (res.message === 'Wrong answer' || res.message === 'Auth failed') {
            setIncorrect(true)
            answerRef.current.value = ''
            upincorrect()
        } else if (res.message === 'Answer required!') {
            setRequired(true)
            answerRef.current.value = ''
            uprequire()
        } else {
            localStorage.googlebooksapi9000temp = res.token
            history.push('/newpassword')
        }
    }

    function upAuth(){
        setTimeout(()=>setAuth(false), 3000)
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
                <h5 className="upr" style={{display: auth ? 'block' : 'none'}}>No such being!</h5>
                <h5 className="upr" style={{display: required ? 'block' : 'none'}}>Answer required</h5>
                <h5 className="upr" style={{display: incorrect ? 'block' : 'none'}}>Incorrect answer</h5>
                <div style={{display: !show ? 'block' : 'none'}}>
                    <label htmlFor="enteruse" className="form-label">
                        <div className="labels">
                            <h3 className="dev1">User</h3>
                            <h3 className="dev2">name</h3>
                        </div>
                    </label>
                    <input className="form-control logInput" ref={userRef}/>
                    <button className="signupBTN" onClick={requestQuestion}>Request</button>
                </div>
                <div style={{display: show ? 'block' : 'none'}}>
                    <label className="form-label">
                        <div className="labels">
                            <h3 className="dev1">Ques</h3>
                            <h3 className="dev2">tion</h3>
                        </div>
                    </label>
                    <input type="text" className="form-control-plaintext questionArea" ref={questionRef} value={question} readOnly/>
                </div>
                <div style={{display: show ? 'block' : 'none'}}>
                    <label htmlFor="password" className="form-label">
                        <div className="labels">
                            <h3 className="dev1">Ans</h3>
                            <h3 className="dev2">wer</h3>
                        </div>
                    </label>
                    <input type="password" className="form-control signupInput" ref={answerRef}/>
                    <button className="signupBTN" onClick={requestAuth}>Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default ForgotPasswordAuthPage