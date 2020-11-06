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
let checkHod=false
let dHodId=false

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
    marginTop:"30px"

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
    marginTop:"30px",
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
      hodName:'',
      hodEmail:'',
      deleteOpen:false,
      deleteHodOpen:false,
      addHodOpen:false
      };
  }

//Delete Hod SEction
handleDeleteHodDialogOpen=(id)=>{  
  dHodId=id
  this.setState({
    deleteHodOpen:true
  })
}
handleDeleteHodDialogClose=()=>{
  this.setState({
    deleteHodOpen:false
  })
}

handleDeleteHod=(id)=>{
  this.handleDeleteHodDialogClose()
  axios({
    method: "post",
    url: SERVER_URL + "/deleteUser?type=hod",
    credentials: "include",
    withCredentials: true,
    data: qs.stringify({
      id:id
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization : 'Bearer '+ localStorage.getItem("access_token")
    }
  })
  .then(res => {
    console.log("Hod deleted!!!!")
    dHodId=null
    window.location.reload(false);
  })

  .catch(err => {
    console.log(err);
    });
}




//Add Hod Section
handleAddHodDialogOpen=()=>{  
  this.setState({
    addHodOpen:true
  })
}
handleAddHodDialogClose=()=>{
  this.setState({
    addHodOpen:false
  })
}

handleHodNameChange = (e) => {
  this.setState({
    hodName:e.target.value
  })
  }
  
  handleHodEmailChange = (e) => {
  this.setState({
    hodEmail:e.target.value
  })
  }

  //axios for addHod
  handleAddHod=()=>{
    if(this.state.hodName==="" || this.state.hodEmail===""){
      alert("HOD name or email cannot be empty")
    }else{
      axios({
        method: "post",
        url: SERVER_URL + "/addhod",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          name:this.state.hodName,
          email:this.state.hodEmail
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization : 'Bearer '+ localStorage.getItem("access_token")
        }
      })
      .then(res => {
        console.log("HOD Assigned Successfully!!!!!")
        this.setState({
          hodName:"",
          hodEmail:"",
          addHodOpen:false
        })
       
        window.location.reload(false);
      })
  
      .catch(err => {
        alert("HOD not assigned")
        this.setState({
          addHodOpen:false
        })
        console.log(err);
        });
    }
  }



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

//Delete guide DialogBOX

handleDeleteDialogOpen=(id,name,email)=>{
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
    if(guideData === null){
      this.getGuide()
    }
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "admin") {
      if(guideData!==null){
        return (<React.Fragment>
          <SideMenu/>
         {/* MANAGE GUIDE UI START */}
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
           if(guide.type==="hod"){checkHod=true}
           if(guide.type ==="guide") return <Card className={classes.guideList}>
           <Grid container>
             <Grid item xs={1}></Grid>
             <Grid item xs={4}><Typography>{guide.name}</Typography></Grid>
             <Grid item xs={5}><Typography>{guide.email}</Typography></Grid>
             <Grid item xs={2}><DeleteIcon className={classes.deleteIconStyle} onClick={()=>this.handleDeleteDialogOpen(guide.id,guide.name,guide.email)}/></Grid>
           </Grid>
           </Card>
           else return null
           
         }) :<CircularProgress/>}</div>
       {/* Dialog box for delete confirmation of Guide   */}
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
     {/* MANAGE GUIDE UI END */}
     {/* MANAGE HOD UI START */}
     <div>
       <Typography variant='h2' style={{margin:"30px auto"}}>Manage Hod</Typography>
       <div>{checkHod?null:<Button variant="contained" color="primary" onClick={this.handleAddHodDialogOpen}>Assign HOD </Button>}</div>  
       <div className={classes.guideListHolder}>  
      
       {guideData!==null? guideData.map(hod=>{
         if(hod.type==="hod"){
         checkHod= true;
         return <Card className={classes.guideList}>
           <Grid container>
             <Grid item xs={1}></Grid>
             <Grid item xs={4}><Typography>{hod.name}</Typography></Grid>
             <Grid item xs={5}><Typography>{hod.email}</Typography></Grid>
             <Grid item xs={2}><DeleteIcon className={classes.deleteIconStyle} onClick={()=>this.handleDeleteHodDialogOpen(hod.id)}/></Grid>
           </Grid>
           </Card>
         }  
           else
           return null 
       }):<CircularProgress/>}
       </div>
       {/* Dialog for Delete hod */}
       <div>
       <Dialog
         open={this.state.deleteHodOpen}
         onClose={this.handleDeleteHodDialogClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
         <DialogTitle id="alert-dialog-title">{"Delete HOD"}</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             Are you sure you want to delete this HOD? 
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleDeleteHodDialogClose} color="primary">
             Cancel
           </Button>
           <Button onClick={()=>this.handleDeleteHod(dHodId)} color="primary" >
             Delete
           </Button>
         </DialogActions>
       </Dialog>
     </div>
     {/* Add HOD DIALOG */}
     <div>
     <Dialog open={this.state.addHodOpen} onClose={this.handleAddHodDialogClose} aria-labelledby="form-dialog-title">
             <DialogTitle id="form-dialog-title">Add HOD</DialogTitle>
             <DialogContent>
               <DialogContentText>
                 Please add name and email of HOD
               </DialogContentText>
                 <TextField
                   autoFocus
                   margin="dense"
                   id="HodName"
                   label="HOD Name"
                   type="text"
                   value={this.state.hodName}
                   onChange={this.handleHodNameChange}
                   fullWidth
                   required
                 />
                 <TextField
                   margin="dense"
                   id="HodEmail"
                   label="HOD Email"
                   type="text"
                   value={this.state.hodEmail}
                   onChange={this.handleHodEmailChange}
                   fullWidth
                   required
                 />
             </DialogContent>
             <DialogActions>
               <Button onClick={this.handleAddHodDialogClose} color="primary">
                 Cancel
               </Button>
               <Button onClick={this.handleAddHod} color="primary">
                 Submit
               </Button>
             </DialogActions>
           </Dialog>
         </div>
     </div>
     {/* MANAGE HOD UI END */}
       </React.Fragment>)
      }
      else return <LinearProgress/>  
    } else {
      return <Redirect to="/" />;
    }
      }
}

export default withStyles(useStyles)(AdminGuidePage);