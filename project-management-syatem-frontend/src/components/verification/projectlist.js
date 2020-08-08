import React, { useContext } from "react";
import { ProjectContext } from "../../context/projectcontext";
import ProjectDetails from "./projectdetails";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ProjectList = () => {
  const { projects } = useContext(ProjectContext);
  return projects.length ? (
    <div className="project-list">
      <Tabs>
        <TabList>
          <Tab>Approved</Tab>
          <Tab>Not Approved</Tab>
        </TabList>
        <TabPanel>
          {projects.map(project => {
            return !project.isapproved ? null : (
              <ProjectDetails project={project} key={project.id} />
            );
          })}
        </TabPanel>
        <TabPanel>
          {projects.map(project => {
            return !project.isapproved ? (
              <ProjectDetails project={project} key={project.id} />
            ) : null;
          })}
        </TabPanel>
      </Tabs>
    </div>
  ) : (
    <div className="empty">No projects submitted</div>
  );
};

export default ProjectList;
