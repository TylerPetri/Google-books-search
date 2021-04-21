function fetchJSON( url, method='get', data={} ){
    const fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        }
    }
    if( method === 'post' || method === 'put' ) {
        fetchOptions.body = JSON.stringify( data )
    }

    return fetch( url,fetchOptions ).then( r=>r.json())
    
}

export default fetchJSON