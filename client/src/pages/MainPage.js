import React, {useContext} from "react";
import PatientTable from "../components/PatientTable";
import EmployeeModal from "../components/EmployeeModal";
import SearchBar from "../components/SearchBar";
import { EmployeeContext } from '../context/EmployeeContext';
import { withRouter } from "react-router";

const MainPage = () => {
const data = useContext(EmployeeContext).data
  return (
    <div>
      <h1>Patient List</h1>
      <div className="searchBar">
        <div>
          <SearchBar />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <EmployeeModal />
        </div>
      </div>
      <PatientTable data={data} />
    </div>
  );
};

export default withRouter(MainPage);
