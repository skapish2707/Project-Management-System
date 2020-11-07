import React, { Component } from 'react'
import SideMenu from './SideMenu'
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import { Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import {Card,Button,CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";

let Groupid=null
let deleteMemberEmail=null
let groupData=null

const useStyles = (theme => ({
  root: {
    width: '100%',
    
  },
   mainAccor:{
    color:"#303030" 
  },
  memberHolder:{
    width:"10%",
    backgroundColor:"#909090"
  },
  groupCard:{
    width:"100%",
    padding:"8px 0px",
    marginTop:"2px",
    borderRadius:"0px",
    textAlign:"left",
  },
  accorStyle:{
    backgroundColor:"#d3d3d3"
  },
  deleteIconStyle:{
    cursor:"pointer",
    "&:hover": {
      color: 'red'
    }
  }
  }));

class AdminGroupsPage extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token === "admin") {
      loggedIn = true;
    }

    this.state = {
      loggedIn,
      user: "",
      groupDetails:null,
      deleteMemberOpen:false
      };
  }


  getStat = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
    })
      .then(res => {
        this.setState({
          loggedIn: true,
          user: res.data
        });
      })

      .catch(err => {
        this.setState({
          loggedIn: false,
          user: "No User"
        });
        localStorage.removeItem("token");
      });
  };
  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
    })
      .then(res => {
        groupData=res.data
        this.setState({
          groupDetails:res.data
          });
      })

      .catch(function (err) {
        console.log(err);
      });
      
  }
  //DELETE MEMBERS
  handleDeleteMemberDialogOpen=(id,email)=>{  
    deleteMemberEmail=email
    Groupid=id
    console.log(deleteMemberEmail,Groupid)
     this.setState({
      deleteMemberOpen:true
    })
  }
  handleDeleteMemberDialogClose=()=>{
    this.setState({
      deleteMemberOpen:false
    })
  }




  render() {
    const {classes} = this.props;
    if (this.state.groupDetails === null){
      this.checkData();
    } 
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "admin") {
      return (
        <React.Fragment>
         <SideMenu/>

        {/* Dialog box for delete MEMBER confirmation*/}
       <div>
       <Dialog
         open={this.state.deleteMemberOpen}
         onClose={this.handleDeleteMemberDialogClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
         <DialogTitle id="alert-dialog-title">{"Delete Member"}</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             Are you sure you want to delete this Member? You need to assign another student after deleting this one
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleDeleteMemberDialogClose} color="primary">
             Cancel
           </Button>
           <Button  color="primary" >
             Delete
           </Button>
         </DialogActions>
       </Dialog>
     </div> 
         
        {groupData?groupData.map(group=>{
          let gid = group.id
          return <Accordion className={classes.mainAccor}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{group.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <React.Fragment>
       
      {/* MEMBERS ACCORDON */}
      <div className={classes.root}>
      <Accordion className={classes.accorStyle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Members</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div style={{width:"100%"}}>
         <Card className={classes.groupCard}>
           <Grid container>
             <Grid item xs={1}></Grid>
             <Grid item xs={4}><Typography>Name</Typography></Grid>
             <Grid item xs={4}><Typography>Email</Typography></Grid>
             <Grid item xs={2}><Typography>Rollno</Typography></Grid>
             <Grid item xs={1}></Grid>
           </Grid>
           </Card>
          {group.members.map(member=>{
            let dmemberEmail=member.email
            return<Card className={classes.groupCard}>
           <Grid container>
             <Grid item xs={1}></Grid>
             <Grid item xs={4}><Typography>{member.name}</Typography></Grid>
             <Grid item xs={4}><Typography>{member.email}</Typography></Grid>
             <Grid item xs={2}><Typography>{member.rollno}</Typography></Grid>
             <Grid item xs={1}><DeleteIcon className={classes.deleteIconStyle} onClick={()=>this.handleDeleteMemberDialogOpen(gid,dmemberEmail)}/></Grid>
           </Grid>
           </Card>
            })}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* PROPOSAL ACCORDION */}
      <Accordion className={classes.accorStyle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Proposals</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className={classes.root}>
        {group.proposals.length===3?group.proposals.map((proposal,index)=>{
          let approval = proposal.approval;
          let pid = proposal._id;
             
          return(<Accordion style={{textAlign:"left"}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Proposal {index+1}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container
          className={classes.content}
          spacing={1}
          >
          <Grid item xs={12}>
           <Typography>
           <b>Title:&nbsp;&nbsp;</b>
            {proposal.title}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography>
            <b>Details:&nbsp;&nbsp;</b>
               {proposal.details}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Method:&nbsp;&nbsp;</b>
                  {proposal.method}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Requirements:&nbsp;&nbsp;</b>
                  {proposal.requirements}
                </Typography>
              </Grid>
               <Grid item xs={12}>
                <Typography>
                  <b>Specialization:&nbsp;&nbsp;</b>
                  {proposal.specialization}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Result:&nbsp;&nbsp;</b>
                  {proposal.result}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Appied On:&nbsp;&nbsp;</b>
                  {/* {proposal.applied.split("T")[0]} */}
                  {proposal.applied.substr(0, 10)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Attached Print:&nbsp;&nbsp;</b>
                  {proposal.attachPrints}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {approval.admin ? (
                  <Typography>
                    <b>Admin approval status:</b>Approved
                  </Typography>
                ) : (
                  <Typography>
                    <b>Admin approval status:</b>not approved
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {approval.hod ? (
                  <Typography>
                    <b>HOD approval status:</b>Approved
                  </Typography>
                ) : (
                  <Typography>
                    <b>HOD approval status:</b>not approved
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    window.open(
                      `http://localhost:8000/${proposal.attachPrints}`
                    );
                  }}
                >
                  Show Uploaded Document
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ textAlign: "right" }}
              >
                
              </Grid>
            </Grid>
        </AccordionDetails>
      </Accordion>)
        }):<Typography>Proposals Not filled yet</Typography>}

        </div>
        </AccordionDetails>
      </Accordion>

      {/* PRESENTATION ACCORDION */}
      <Accordion className={classes.accorStyle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Presentation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
      </React.Fragment> 
        </AccordionDetails>
        </Accordion>
        }):<LinearProgress/>}
        
        </React.Fragment>
      );
    } else {
      return <Redirect to="/" />;
    }
      }
}

export default withStyles(useStyles)(AdminGroupsPage);
