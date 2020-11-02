import React from 'react';
import { NavLink } from "react-router-dom"

const ProjectDetails = (project) => {
    // const handleClick = () => {
    //     const pro_to_show = project;
    //     ProjectForm(pro_to_show);
    // } 
    return (
            <NavLink to={{pathname:"/projectform",aboutProps:{project}}}>
                <div>
                    <label className="title"> Title : {project.project.title}</label>
                    <label className="id"> ID : {project.project.id}</label>
                </div>
            </NavLink>
     );
}
 
export default ProjectDetails;

