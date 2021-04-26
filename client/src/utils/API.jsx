function fetchJSON( url, method='get', data={} ){
    const fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            username: localStorage.getItem('usernameGoogleBooksTP'),
            token: localStorage.getItem('tokenGoogleBooksTP')
        }
    }
    if( method === 'post' || method === 'put' ) {
        fetchOptions.body = JSON.stringify( data )
    }

    return fetch( url,fetchOptions ).then( r=>r.json())
    
}

export default fetchJSON