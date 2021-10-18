import {serverUrl} from './env'

let baseUrl = `${serverUrl}/auth`

export const login = (email, password) =>{
    let url = `${baseUrl}/login`

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
    "email": email,
    "password": password
    });

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    return new Promise((resolve,reject)=>{
        fetch(url,requestOptions)
        .then(response => response.json())
        .then(result =>{
            resolve(result)
            sessionStorage.setItem("access_token", result.access_token)
        })
        .catch(error =>{
            reject(error)
            alert(error)
        })

    })
  }

