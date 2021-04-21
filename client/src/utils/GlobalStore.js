import React, { createContext, useReducer, useContext } from "react"

// any variables we depend on for UI/flow we must pre-set
const initialData = {
  name: "",  
  token: "", 
  nav: false, 
  opa: false, 
  rightMarg: false,
  searchResults: {},
  modal: false,
  log: false
}

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ALREADY_SIGNEDIN":
      return { ...state, ...action.data}
    case "USER_LOGIN":
      return { ...state, ...action.data, alert: action.message || '', authOk: true }
    case "USER_LOGOUT":
      // needed to force this reload (else it just refreshed with invalid content)
      localStorage.removeItem('email')
      localStorage.removeItem('token')
      window.location.href = '/'
      return { ...initialData, alert: action.message || '' }
    case "NAV_CLOSE":
      return { ...state, opa:false, nav:false, rightMarg:false }
    case "NAV_OPEN":
      return { ...state, nav:true, opa:true, rightMarg:true}
    case "setSearchResults":
      return { ...state, ...action.data}
    case "SHOW_MODAL":
      return { ...state, modal:true}
    case "HIDE_MODAL":
      return { ...state, modal:false}
    case "LOG_TRUE":
      return { ...state, log: true}
    case "LOG_FALSE":
      return { ...state, log: false}
    default:
      console.log(`Invalid action type: ${action.type}`)
      return state
  }
}



const StoreContext = createContext()

const useStoreContext = function(){
  return useContext(StoreContext)
}

const StoreProvider = function(props){
  const [state, dispatch] = useReducer( dataReducer, initialData )
  return <StoreContext.Provider value={[state, dispatch]} {...props} />
}

export { StoreProvider, useStoreContext }