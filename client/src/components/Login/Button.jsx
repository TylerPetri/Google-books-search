import { useStoreContext } from "../../utils/GlobalStore"
import './Login.css'

function LoginButton() {

    const [{name, token, log, modal}, dispatch] = useStoreContext()

    function toggleModal(){
        dispatch({type:'SHOW_MODAL'})
      }
    
    function logout(){
        dispatch({type:'LOG_FALSE'})
        dispatch({type:"USER_LOGOUT"})
      }

    return (
        <>
        {log ? <button type="button" className="signinBtn" onClick={logout}>
                    Sign out
            </button>
            :
            <div className="logdiv">
            <button type="button" className="signinBtn" onClick={toggleModal}>
                        Sign in
            </button> 
            </div>
        }
        </>
    )
}

export default LoginButton