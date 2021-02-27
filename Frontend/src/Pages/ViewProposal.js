import React, { useEffect, useState } from "react";
import axios from "axios";
import SERVER_URL from "../../src/Pages/URL";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "33.33%",
    flexShrink: 0,
    textAlign: "left",
    [theme.breakpoints.down("600")]: {
      display: "none"
    }
  },
  grid: {
    margin: "20px",
    textAlign: "center"
  },
  comment: {
    marginTop: "50px"
  },
  comTitle: {
    textAlign: "right",
    margin: "auto 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left"
    }
  },
  comField: {
    width: "90%",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  comButton: {
    textAlign: "left",
    margin: "auto 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "right"
    }
  }
}));

const ViewProposal = props => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const Gid = props.match.params.id;
  useEffect(() => {
    axios({
      method: "get",
      url: SERVER_URL + `/view/group/${Gid}`
    })
      .then(res => {
        setLoadedData(res.data);
      })

      .catch(err => {
        alert("Something went wrong");
      });
  }, []);
  console.log(loadedData);

  {
    if (loadedData) {
      return loadedData.map(group => {
        console.log("Inside map");
        return (
          <div key={group.id}>
            <h1>{group.agency}</h1>
          </div>
        );
      });
    } else return <h1>Loading</h1>;
  }
};

export default ViewProposal;
