import React, { useState, useContext } from "react";
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
import { EmployeeContext } from "../context/EmployeeContext";
import { deleteEmployee, updateEmployee } from "../apis/api";


export default function FormDialog(props) {
  const data = useContext(EmployeeContext).data;
  const setData = useContext(EmployeeContext).setData;

  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState(props.department);
  const [fname, setFname] = useState(props.firstName);
  const [lname, setLname] = useState(props.lastName);
  const [employeeNum, setEmployeeNum] = useState(props.employeeNum);

  const handleDeleteEmployee = () => {
    const index = data.findIndex((emp) => emp.employee_num === employeeNum);
    if (index === -1) {
      alert("error: employee number is invalid");
    } else {
      deleteEmployee(employeeNum)
        .then((result) => {
          if ("Success" in result) {
            const temp = [...data];
            temp.splice(index, 1);
            setData(temp);
            alert(result.Success);
          } else {
            alert(result.Error);
          }
        })
        .then(setOpen(false));
    }
  };

  const handleUpdateEmployee = () => {
    const index = data.findIndex((emp) => emp.employee_num === employeeNum);
    if (index === -1) {
      alert("error: invalid employee number");
    } else {
      updateEmployee(employeeNum, department, fname, lname)
        .then((result) => {
          if ("employee" in result) {
            const temp = [...data];
            temp[index].first_name = result.employee.first_name;
            temp[index].last_name = result.employee.last_name;
            temp[index].employee_num = result.employee.employee_num;
            temp[index].department = result.employee.department;
            setData(temp);
          } else {
            alert(result.Error);
          }
        })
        .then(setOpen(false));
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        = EDIT
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>

          <DialogTitle>Edit Employee</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="employeeNum"
            label="Employee Number (8 Digits)"
            type="number"
            fullWidth
            variant="standard"
            value={props.employeeNum}
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <Box sx={{ minWidth: 120, paddingTop: 5 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem defaultValue value="SALES">
                  Sales
                </MenuItem>
                <MenuItem value="ENGINEERING">Engineering</MenuItem>
                <MenuItem value="PRODUCT">Product</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteEmployee} color="error">
            Delete
          </Button>
          <Button onClick={handleUpdateEmployee}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
