import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import './Login.css'
import { useStoreContext } from "../../utils/GlobalStore"

function LoginForm(){

  const [{modal}, dispatch] = useStoreContext()
  const [authFail, setAuthFail] = useState(false)
  const userRef = useRef()
  const passRef = useRef()
  let pcUser = ''


  function dismissModal (){
    dispatch({type:'HIDE_MODAL'})
  }

  useEffect(function(){
    if (localStorage.getItem("usernameGoogleBooksTP") !== null) {
      pcUser = localStorage.getItem("usernameGoogleBooksTP")
      dispatch({type: 'LOG_TRUE'})
      }
    if(pcUser !== ''){
      dispatch({ type: 'ALREADY_SIGNEDIN', data: {username:pcUser}})
    }
  }, [])


  async function login(e){
    e.preventDefault()

    const data = {
      username: userRef.current.value,
      password: passRef.current.value
    }

    const fetchOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
      }
      fetchOptions.body = JSON.stringify(data)
    
    const {token, username, message} = await fetch('/login', fetchOptions).then(r=>r.json())

    userRef.current.value = ''
    passRef.current.value = ''

    if (message === 'Auth successful') {
      localStorage.tokenGoogleBooksTP = 'Bearer=' + token
      localStorage.usernameGoogleBooksTP = username
      pcUser = username
      dispatch({ type: 'USER_LOGIN', data: {username:username, token: token }})
      dispatch({type: "HIDE_MODAL"})
      dispatch({type: 'LOG_TRUE'})
      dispatch({type: 'NO_REDIRECT'})
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
                <div className="modal-title modalTitle" id="exampleModalLabel"></div>
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
                        <input className="form-control logInput" ref={userRef}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="enterpass" className="form-label">
                          <div className="labels">
                            <h3 className="dev1">Pass</h3>
                            <h3 className="dev2">word</h3>
                          </div>
                        </label>
                        <input type="password" className="form-control logInput" ref={passRef}/>
                      </div>
                      <div className="signLogCont">
                        <div className="forgotSign">
                          <Link to='/newpasswordAuth' className="newPassword" onClick={dismissModal}>Forgot password?</Link>
                          <Link to='/signup' className="signupA" onClick={dismissModal}>Sign up</Link>
                        </div>
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