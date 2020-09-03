import React from "react";
import { useLocation } from "react-router-dom";

const PrefPage = props => {
  //getting passed data via history
  const location = useLocation();
  console.log(location.state.Group);
  const Group = location.state.Group;
  console.log(Group);
  return <div>{Group.name}</div>;
};

export default PrefPage;
