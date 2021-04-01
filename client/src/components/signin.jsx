import { useRef } from 'react'
import './styles.css'


function SignInPage(){

    const userRef = useRef()
    const passRef = useRef()

    async function signin(e){
        e.preventDefault()

        const data = {
            email: userRef.current.value,
            password: passRef.current.value
        }

        const fetchOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
          }
          fetchOptions.body = JSON.stringify(data)
        
        await fetch('/login', fetchOptions).then(r=>r.json())
        
        console.log(data)
        console.log(fetchOptions.body)
    }

    return(
        <div className="wrapper">
            <form>
                <div>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input className="form-control" ref={userRef}/>
                </div>
                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" ref={passRef}/>
                </div>
                <button className="signupBTN" onClick={signin}>Login</button>
            </form>
        </div>
    )
}

export default SignInPage