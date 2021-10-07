import React from "react"
import EditModal from "./EditModal"

const TableRow = (props) => {
    const employeeNum = props.employeeNum
    const firstName = props.firstName
    const lastName = props.lastName
    const department = props.department
    return (
      <tbody>
        <tr>
        <td>{employeeNum}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{department}</td>
        <td style={{display:"flex",justifyContent:"center"}}><EditModal {...{employeeNum,firstName,lastName,department}}/></td>
      </tr>
      </tbody>
    )
}

export default TableRow
