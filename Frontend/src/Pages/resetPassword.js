import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Image from "./Login/background2.jpg";
import LinearProgress from "@material-ui/core/LinearProgress";
import SERVER_URL from "./URL";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import PersonIcon from "@material-ui/icons/Person";
import qs from "qs";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = theme => ({

	leftpaper: {
		backgroundImage: `url(${Image})`,
		backgroundSize: "cover",
		height: "100%"
	},
	paper: {
		background: "transparent",
		borderRadius: "6px",
		float: "center",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		color: "#fff",
		paddingTop: "60px",
		[theme.breakpoints.down("575")]: {
		  paddingTop: "20px"
		}
	},
	form: {
	    width: "90%", 
	    marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		padding: "10px",
		fontSize: "18px",
		fontWeight: "bolder",
		backgroundColor: "#1877f2",
		marginBottom: "25px"
	},
	fields: {
		backgroundColor: "#fff",
		borderRadius: "3px"
	},
	title: {
		paddingTop: "50px",
		color: "#fff",
		[theme.breakpoints.down("775")]: {
		  fontSize: "45px"
		},
		[theme.breakpoints.down("575")]: {
		  fontSize: "40px"
		}
	},
	avatar: {
	    margin: theme.spacing(1),
	    backgroundColor: "#1877f2",
	    height: "50px",
	    width: "50px",
	    marginTop: "30px"
  },

});

class resetPassword extends Component { 
	constructor(props) {
		super(props);
		this.state ={
			token :localStorage.getItem("token"),
			msg : "",
			newPassword : "",
			confirmPassword:"",
			loading : false,
			openSuccees:false,
			openFailure:false,
			openInfo:false,
			done:false
		}
		this.submitForm = this.submitForm.bind(this);
	}
	handleChange = name => ({ target: { value } }) => {
		this.setState({ [name]: value });
	};
	submitForm(e){
		e.preventDefault();
		if(this.state.newPassword !== this.state.confirmPassword){
		  this.setState({msg : "Two fields Doesn't match"}) ;
		}else if(this.state.newPassword.length < 8){
		  this.setState({msg : "Please Enter a Password with length greater than 8"});
		}
		else{
			this.setState({loading:true})
			axios({
			method: "post",
			url: SERVER_URL+"/resetPassword/"+this.props.match.params.id,
			data: qs.stringify({
				newPassword:this.state.newPassword
			}),
			headers: {
			"content-type": "application/x-www-form-urlencoded;charset=utf-8"
			}})
			.then((res)=>{
				if(res.data === "yes")
					this.setState({
						loading:false,
						openSuccees:true
					})
				else
					this.setState({
						loading:false,
						openInfo:true
					})
			})
			.catch((err)=>{
				this.setState({
					loading:false,
					openFailure:true
				})
			})
		}
	}

	render() {
		if(this.state.token != null)
			return <Redirect to="/" exact />;
		if(this.state.loading)
			return <LinearProgress/>
		if (this.state.done)
			return <Redirect to="/" exact />;
		const { classes } = this.props
		const handleClose = (event, reason) => {
		if(this.state.openSuccees)
			this.setState({openSuccees: false,done:true});
		else if(this.state.openFailure)
			this.setState({openFailure : false});
		else if(this.state.openInfo)
			this.setState({openInfo : false});
		}
		return (
			<React.Fragment>
			<div className={classes.leftpaper}>
	          <Typography variant="h2" className={classes.title}>
	            <b>Project Management System</b>
	          </Typography>
	          <Container component="main" maxWidth="xs" className={classes.paper}>
	            <CssBaseline />
	            <Avatar variant="circle" className={classes.avatar}>
		          <PersonIcon fontSize="large" />
		        </Avatar>
		        <Typography component="h2" variant="h6">
		          <b>Reset Password</b>
		        </Typography>
	            <form className={classes.form} onSubmit={this.submitForm}>
	              <TextField
                  variant="filled"
                  margin="normal"
                  type="password"
                  required
                  fullWidth
                  label="New Password"
                  className={classes.fields}
                  value={this.state.newPassword}
                  onChange={this.handleChange("newPassword")}
                  autoFocus
                />
                <TextField
                  variant="filled"
                  type="password"
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm Password"
                  className={classes.fields}
                  value={this.state.confirmPassword}
                  onChange={this.handleChange("confirmPassword")}
                />
	              <Typography variant="subtitle2" color="info">
	                  {this.state.msg}
	              </Typography>
	              <Button
	                type="submit"
	                fullWidth
	                variant="contained"
	                color="primary"
	                className={classes.submit}
	              >
	                Reset Password
	              </Button>
	             
	            </form>
				<Snackbar open={this.state.openSuccees} onClose={handleClose} autoHideDuration={6000}>
					<Alert onClose={handleClose} severity="success" >
					Your Password was changed successfully You will be redirect to login page
					</Alert>
				</Snackbar>
				<Snackbar open={this.state.openInfo} onClose={handleClose}>
					<Alert onClose={handleClose} severity="error">
					This Link has expired please reapply for reset password
					</Alert>
				</Snackbar>
				<Snackbar open={this.state.openFailure} onClose={handleClose}>
					<Alert onClose={handleClose} severity="error">
					There was some problem while changing your password please refresh the page and try again
					</Alert>
				</Snackbar>  
	          </Container>
	        </div>
	      </React.Fragment>
		)
	}
}


export default withStyles(useStyles)(resetPassword);