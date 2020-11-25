import React from "react";
import ProjectContextProvider from "../../context/projectcontext";
import ProjectList from "../verification/projectlist";
import LoggedNavbar from "../Navbar/LoggedNavbar";

const FacultyContent = props => {
  return (
    <div>
      <LoggedNavbar />
      <ProjectContextProvider>
        <ProjectList />
      </ProjectContextProvider>
    </div>
  );
};

export default FacultyContent;
