import React , {useState, useEffect, useContext} from "react";
import { getEmployees } from "../apis/api";
import { EmployeeContext } from "../context/EmployeeContext";

const SearchBar = () => {
    
    const setData = useContext(EmployeeContext).setData
    const [filter,setFilter] = useState(null)
    const [search,setSearch] = useState(null)
    const [searchVal,setSearchVal] = useState(null)

    const handleOnClick = () =>{
        getEmployees(filter,search,searchVal)
        .then(result => {
          if ('Error' in result){
            alert(result.Error)
          }
          else{
            setData(result.employees)}
          }
          )
      }

    useEffect(()=>{
      getEmployees(filter,search,searchVal)
      .then(result => {
        setData(result.employees)}
        )
    },[])
    return (

        <div>
        <label>Department:</label>
          <select onChange={e => setFilter(e.target.value)}name="department" id="department">
            <option value="">All</option>
            <option value="SALES">SALES</option>
            <option value="ENGINEERING">ENGINEERING</option>
            <option value="PRODUCT">PRODUCT</option>
          </select>
        <label>Search By:</label>
          <select onChange = {e => setSearch(e.target.value)}>
          <option value="">none</option>
            <option value="fname">First Name</option>
            <option value="lname">Last Name</option>
            <option value="employee_num">Employee Number</option>
          </select>
        <input onChange={e => setSearchVal(e.target.value)}type="text" id="searchInput" name="searchInput"/>
        <input onClick={handleOnClick} type="submit" value="Search"/>
        </div>
    )
}

export default SearchBar;
