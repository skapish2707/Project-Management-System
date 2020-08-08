import React from "react";
import "./FacultyContent.css";
import ProjectContextProvider from "../../context/projectcontext";
import ProjectList from "../verification/projectlist";

const FacultyContent = props => {
  return (
    <div>
      <ProjectContextProvider>
        <ProjectList />
      </ProjectContextProvider>
    </div>
  );
};

export default FacultyContent;
