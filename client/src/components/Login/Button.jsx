import { useStoreContext } from "../../utils/GlobalStore"
import './Login.css'

function LoginButton() {

    const [{log}, dispatch] = useStoreContext()

    function toggleModal(){
        dispatch({type:'SHOW_MODAL'})
      }
    
    function logout(){
        dispatch({type:"USER_LOGOUT"})
      }

    return (
        <>
        {log ? 
            <div className="logdiv">
            <button type="button" className="signinBtn" onClick={logout}>
                    Sign out
            </button>
            </div>
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