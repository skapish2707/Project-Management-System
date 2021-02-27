import React, { useEffect, useState } from "react";
import axios from "axios";
import SERVER_URL from "../../src/Pages/URL";

const ViewProposal = props => {
  const [loadedData, setLoadedData] = useState();
  console.log(props.match.params.id);
  useEffect(() => {
    axios({
      method: "get",
      url: SERVER_URL + "/view/group/60348fbac381184ae876a69d"
    })
      .then(res => {
        setLoadedData(res.data);
      })

      .catch(err => {
        alert("Something went wrong");
      });
  }, [axios]);
  return <div>Public Page</div>;
};

export default ViewProposal;
