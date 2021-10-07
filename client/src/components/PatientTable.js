import React from "react"
import TableRow from './TableRow'

function PatientTable({data}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Employee Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th> </th>
          </tr>
          </thead>
         
          {data.map((val,idx)=>(
            <React.Fragment key={val.employee_num}>
            <TableRow 
            employeeNum={val.employee_num} 
            firstName={val.first_name} 
            lastName ={val.last_name} 
            department ={val.department}/>
            </React.Fragment>
          ))}
          
        </table>

        </div>
    )
}

export default PatientTable
