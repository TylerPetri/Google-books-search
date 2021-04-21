import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import './Login.css'
import { useStoreContext } from "../../utils/GlobalStore"

function LoginForm(props){

  const [{name, token, modal, log}, dispatch] = useStoreContext()
  const [authFail, setAuthFail] = useState(false)
  const userRef = useRef()
  const passRef = useRef()
  let pcUser = ''


  function dismissModal (){
    dispatch({type:'HIDE_MODAL'})
  }

  useEffect(function(){
    if (localStorage.getItem("email") !== null) {
      pcUser = localStorage.getItem("email")
      dispatch({type: 'LOG_TRUE'})
      }
    if(pcUser !== ''){
      dispatch({ type: 'ALREADY_SIGNEDIN', data: {name:pcUser}})
    }
  }, [])


  async function login(e){
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
    
    const {token, email, message} = await fetch('/login', fetchOptions).then(r=>r.json())
    console.log(message)

    if (message === 'Auth successful') {
      localStorage.token = token
      localStorage.email = email
      pcUser = email
      dispatch({ type: 'USER_LOGIN', data: {name:email, token: token }})
      dispatch({type: "HIDE_MODAL"})
      dispatch({type: 'LOG_TRUE'})
    } else if ( message === 'No such being!' || 'Wrong password') {
      passRef.current.value = ''
      setAuthFail(true)
      failreq()
    }
  }

  function failreq(){
    setTimeout(()=>setAuthFail(false), 3000)
  }

    return (
        <>
        <div className="modalSign" style={{display: modal === true ? 'block' : 'none'}}>
            <div className="modal-content">
              <div className="modalHeader">
                <h5 className="modal-title modalTitle" id="exampleModalLabel"></h5>
                <h6 className="authFail" style={{display: authFail ? 'block' : 'none'}}>Incorrect username or password</h6>
                <button className="btn closeModal" onClick={dismissModal}>&times;</button>
              </div>
              <div className="modalBody">
                  
                  <div className="containerModal">
                    <form className="modalForm">
                      <div className="mb-3">
                        <label htmlFor="enteruse" className="form-label">
                          <div className="labels">
                            <h3 className="dev1">User</h3>
                            <h3 className="dev2">name</h3>
                          </div>
                        </label>
                        <input className="form-control" ref={userRef}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="enterpass" className="form-label">
                          <div className="labels">
                            <h3 className="dev1">User</h3>
                            <h3 className="dev2">name</h3>
                          </div>
                        </label>
                        <input type="password" className="form-control" ref={passRef}/>
                      </div>
                      <div className="signLogCont">
                      <Link to='/signup' className="signupA" onClick={dismissModal}>Sign up</Link>
                      <button className="signinModal" onClick={login}>Sign in</button>
                      </div>
                    </form>
                  </div>

              </div>
            </div>
        </div>
      </>
    )
}

export default LoginForm