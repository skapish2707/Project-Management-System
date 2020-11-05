import React, { Component } from 'react'
import SideMenu from './SideMenu'
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import { Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core"
import {Card,Button,CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import qs from "qs";
import DeleteIcon from '@material-ui/icons/Delete';

let dguideId=null
let dguideEmail=null
let dguideName=null

const useStyles = (theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accorStyle:{
    width:"80%",
    margin:"auto",
    marginTop:"50px"

  },
  guideList:{
    padding:"10px",
    margin:"0px auto",
    marginTop:"2px",
    borderRadius:"0px",
    textAlign:"left",
  },
  guideListHolder:{
    width:"60%",
    margin:"auto",
    marginTop:"50px",
    padding:"20px",
    //backgroundColor:"#fff"
  },
  deleteIconStyle:{
    cursor:"pointer",
    "&:hover": {
      color: 'red'
    }
  }
}));

let guideData = null;

 class AdminGuidePage extends Component {
 //Add Guide Button & different options in Dialog Box
 handleClickOpen = () => {
  this.setState({
    Open:true
  })
};
 handleCloseCancel = () => {
  console.log("CANCEL")
  this.setState({
    Open:false
  })
};
handleCloseSubmit = () => {
  this.setState({
    Loading:true
  })
  if(this.state.guideName==="" || this.state.guideEmail===""){
    alert("Guide name or email cannot be empty")
  }else{
    axios({
      method: "post",
      url: SERVER_URL + "/addGuide?type=new",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        name:this.state.guideName,
        email:this.state.guideEmail
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization : 'Bearer '+ localStorage.getItem("access_token")
      }
    })
    .then(res => {
      console.log("submitted")
      this.setState({
        Loading:false,
        guideName:"",
        guideEmail:"",
        Open:false
      })
     
      window.location.reload(false);
    })

    .catch(err => {
      alert("Guide not added")
      this.setState({
        Loading:false,
        Open:false
      })
      console.log(err);
      });
  }
};

//Delete DialogBOX

handleDeleteDialogOpen=(id,name,email)=>{
  console.log(id)
  dguideEmail=email
  dguideId=id
  dguideName=name
  this.setState({
    deleteOpen:true
  })
}
handleDeleteDialogClose=()=>{
  this.setState({
    deleteOpen:false
  })
}

handleDeleteGuide=(id,name,email)=>{
  console.log("id:",id,"name:",name,"email:",email)
  
  this.handleDeleteDialogClose()
  axios({
    method: "post",
    url: SERVER_URL + "/deleteUser?type=guide",
    credentials: "include",
    withCredentials: true,
    data: qs.stringify({
      id:id,
      name:name,
      email:email
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization : 'Bearer '+ localStorage.getItem("access_token")
    }
  })
  .then(res => {
    console.log("guide deleted!!!!")
    dguideEmail=null
    dguideId=null
    dguideName=null
    window.location.reload(false);
  })

  .catch(err => {
    console.log(err);
    });
}


// Dialog box Guide name and email

handleGNameChange = (e) => {
this.setState({
  guideName:e.target.value
})
}

handleGEmailChange = (e) => {
this.setState({
  guideEmail:e.target.value
})
}

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
      guideDetails:null,
      Open:false,
      Loading:false,
      guideName:'',
      guideEmail:'',
      deleteOpen:false,
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

  getGuide = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/getGuide",
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
    })
      .then(res => {
        guideData= res.data;
        this.setState({
          guideDetails:res.data
          },console.log(res));
      })

      .catch(err => {
        this.setState({
          loggedIn: false,
          user: "No User"
        });
        localStorage.removeItem("token");
      });
  };

  render() {
    const { classes } = this.props;
    if(this.state.guideDetails === null){
      this.getGuide()
    }
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "admin") {
      return (
        <React.Fragment>
         <SideMenu/>
        <Typography variant="h2" style={{margin:"20px auto"}}>Manage Guide </Typography> 
        { !this.state.Loading ? (
        <div>
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Add Guide</Button>
          <Dialog open={this.state.Open} onClose={this.handleCloseCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Guide</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please add name and email of Guide.
              </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="guideName"
                  label="Guide Name"
                  type="text"
                  value={this.state.guideName}
                  onChange={this.handleGNameChange}
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  id="guideEmail"
                  label="Guide Email"
                  type="text"
                  value={this.state.guideEmail}
                  onChange={this.handleGEmailChange}
                  fullWidth
                  required
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleCloseSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div><CircularProgress /></div>
      )}
      <div className={classes.guideListHolder}>
        {guideData !== null? guideData.map(guide=>{
          return <Card className={classes.guideList}>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}><Typography>{guide.name}</Typography></Grid>
            <Grid item xs={5}><Typography>{guide.email}</Typography></Grid>
            <Grid item xs={2}><DeleteIcon className={classes.deleteIconStyle} onClick={()=>this.handleDeleteDialogOpen(guide.id,guide.name,guide.email)}/></Grid>
          </Grid>
          </Card>
          
        }) :<LinearProgress/>}</div>
      {/* Dialog box for delete confirmation   */}
      <div>
      <Dialog
        open={this.state.deleteOpen}
        onClose={this.handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Guide"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this guide? If this guide is assigned to any groups,then you need to assign guides for that group again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>this.handleDeleteGuide(dguideId,dguideName,dguideEmail)} color="primary" >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      </React.Fragment>
        
      );
    } else {
      return <Redirect to="/" />;
    }
      }
}

export default withStyles(useStyles)(AdminGuidePage);