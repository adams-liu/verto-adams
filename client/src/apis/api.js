let baseUrl = "http://localhost:3000/api/employee"
//let baseUrl = "http://localhost:5000/api/employee"


export const getEmployees = (department, search, searchVal) =>{
    let url = `${baseUrl}?`

    if (department !== null && department !== ""){
        url += "&department=" + department;
    }
    if (search !== null && search !== ""){
        url += `&${search}=`+ searchVal;
    }
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then(response => response.json())
        .then(result =>{
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


