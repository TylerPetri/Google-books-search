import { useStoreContext } from "../../utils/GlobalStore"
import './Login.css'

function LoginButton() {

    const [{log, username, dropDown}, dispatch] = useStoreContext()

    function toggleModal(){
        dispatch({type:'SHOW_MODAL'})
      }

    function toggleDropDown(){
      dispatch({type: 'toggleDropDown', data: {dropDown: !dropDown}})
    }

    return (
        <>
        {log ? 
        
            <div className="logdiv">
              <button type="button" className="signinBtn" onClick={toggleDropDown} style={{backgroundColor: dropDown ? 'purple' : 'rgb(224, 105, 253)', color: dropDown ? 'rgb(224, 105, 253)' : 'purple'}}>
                      {username.length > 7 ? username.substring(0, 7) + '..' : username}
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