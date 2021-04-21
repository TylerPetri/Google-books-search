import { useRef } from 'react'
import './Signup.css'


function SignUpPage(){

    const userRef = useRef()
    const passRef = useRef()

    async function signup(e){
        e.preventDefault()

        const data = {
            username: userRef.current.value,
            password: passRef.current.value
        }

        const fetchOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
          }
          fetchOptions.body = JSON.stringify(data)
        
        await fetch('/signup', fetchOptions).then(r=>r.json())

        console.log(data)
        console.log(fetchOptions.body)
    }

    return(
        
            <form>
                <div>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input className="form-control" ref={userRef}/>
                </div>
                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" ref={passRef}/>
                </div>
                <button className="signupBTN" onClick={signup}>Sign up</button>
            </form>
    )
}

export default SignUpPage