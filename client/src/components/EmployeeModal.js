import React, {useState,useContext,useEffect} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { Box } from "@mui/system";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
import { addEmployees } from "../apis/api";
import { EmployeeContext } from "../context/EmployeeContext";


export default function FormDialog() {
  const data = useContext(EmployeeContext).data
  const setData = useContext(EmployeeContext).setData
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState("SALES");
  const [fname,setFname] = useState()
  const [lname,setLname] = useState()
  const [employeeNum, setEmployeeNum] = useState()
  
  useEffect(()=>{
    setEmployeeNum( Math.floor(Math.random() * 100000000))
  },[])


  const handleAddEmployee= () => {
    addEmployees(employeeNum, department, fname, lname)
    .then(result =>{
      if ('employee' in result){
        const temp = [...data]
        temp.push(result.employee)
        setData(temp)
        alert(`${fname} ${lname} sucessfully added!`)
      }else{
        alert(result.Error)
      }
    }).then(
      setOpen(false)
    )
  }

  return (
    <div>
      <Button variant="outlined" onClick={()=>{setOpen(true)}}>
        + ADD
      </Button>
      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="employeeNum"
            label="Employee Number (8 Digits)"
            type="number"
            fullWidth
            variant="standard"
            value={employeeNum}
            onChange={e=>setEmployeeNum(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={fname}
            onChange={e=>setFname(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="lname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={lname}
            onChange={e=>setLname(e.target.value)}
          />
          <Box sx={{ minWidth: 120, paddingTop:5 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={department}
                label="Department"
                onChange={ e => setDepartment(e.target.value)}
              >
                <MenuItem defaultValue value='SALES'>SALES</MenuItem>
                <MenuItem value='ENGINEERING'>ENGINEERING</MenuItem>
                <MenuItem value='PRODUCT'>PRODUCT</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddEmployee}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
