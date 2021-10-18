import {serverUrl} from './env'

let baseUrl = `${serverUrl}/api/employee`

export const getEmployees = (department, search, searchVal) =>{
    let url = `${baseUrl}?`

    if (department !== null && department !== ""){
        url += "&department=" + department;
    }
    if (search !== null && search !== ""){
        url += `&${search}=`+ searchVal;
    }

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("access_token")}`);

    return new Promise((resolve,reject)=>{
        fetch(url,{
            headers: myHeaders
        })
        .then(response => response.json())
        .then(result =>{
            console.log(result)
            resolve(result)
        })
        .catch(error =>{
            reject(error)
        })

    })
  }


export const addEmployees = (employeeNum, department, fname, lname) =>{
    let url = baseUrl
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
    "first_name": fname,
    "last_name": lname,
    "employee_num": employeeNum,
    "department": department
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
        })
        .catch(error =>{
            reject(error)
            alert(error)
        })

    })
  }

  export const deleteEmployee = (employeeNum) =>{
    
    let url = `${baseUrl}/${employeeNum}`
    let raw = "";

    let requestOptions = {
      method: 'DELETE',
      body: raw,
      redirect: 'follow'
    };

    return new Promise((resolve,reject)=>{
        fetch(url,requestOptions)
        .then(response => response.json())
        .then(result =>{
            resolve(result)
        })
        .catch(error =>{
            reject(error)
            alert(error)
        })
    })
   
  }

  export const updateEmployee = (employeeNum, department, fname, lname) =>{
    let myHeaders = new Headers();
    let url = `${baseUrl}/${employeeNum}`
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "first_name": fname,
      "last_name": lname,
      "department": department
    });
    
    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return new Promise((resolve,reject)=>{
        fetch(url,requestOptions)
        .then(response => response.json())
        .then(result =>{
            resolve(result)
        })
        .catch(error =>{
            reject(error)
            alert(error)
        })
    })
   
}


