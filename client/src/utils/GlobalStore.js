import React, { createContext, useReducer, useContext } from "react"

// any variables we depend on for UI/flow we must pre-set
const initialData = {
  username: "",  
  token: "", 
  searchResults: {},
  saved: [],
  modal: false,
  log: false,
  dropDown: false,
  noEntry: false
}

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ALREADY_SIGNEDIN":
      return { ...state, ...action.data}
    case "USER_LOGIN":
      return { ...state, ...action.data }
    case "USER_LOGOUT":
      window.location.href = '/'
      localStorage.removeItem('usernameGoogleBooksTP')
      localStorage.removeItem('tokenGoogleBooksTP')
      return { ...state, name:"", token:"", saved:[], log:false, noEntry: true }
    case "setSearchResults":
      return { ...state, ...action.data}
    case "SAVED_BOOKS":
      return { ...state, ...action.data}
    case "SHOW_MODAL":
      return { ...state, modal:true}
    case "HIDE_MODAL":
      return { ...state, modal:false}
    case "LOG_TRUE":
      return { ...state, log: true}
    case "LOG_FALSE":
      return { ...state, log: false}
    case "toggleDropDown":
      return { ...state, ...action.data}
    case "CLOSE_DROPDOWN":
      return { ...state, dropDown: false}
    case "REDIRECT":
      return { ...state, noEntry: true}
    case "NO_REDIRECT":
      return { ...state, noEntry: false}
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