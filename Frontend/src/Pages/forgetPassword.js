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

class forgetPassword extends Component { 
	constructor(props) {
		super(props);
		this.state ={
			token :localStorage.getItem("token"),
			msg : "",
			email : "",
			loading : false,
			openSuccess:false,
			openInfo:false,
			openFailure:false
		}
		this.submitForm = this.submitForm.bind(this);
	}
	handleChange = name => ({ target: { value } }) => {
		this.setState({ [name]: value });
	};
	submitForm(e){
		e.preventDefault();
		this.setState({loading:true})
		let email = this.state.email
		axios({
			method: "post",
			url: SERVER_URL+"/forgetPassword",
			data: qs.stringify({email: email}),
			headers: {
			"content-type": "application/x-www-form-urlencoded;charset=utf-8"
			}})
			.then((res)=>{
				if(res.data[0]==="A")
					this.setState({
						msg:res.data,
						loading:false,
						openInfo:true
					})
				else
					this.setState({
						msg:res.data,
						loading:false,
						openSuccess:true
					})
			})
			.catch((err)=>{
				this.setState({
					msg:"there was some problem please refresh the page and try again",
					loading:false,
					openFailure:true
				})
			})
		
	}
	render() {
		if(this.state.token != null)
			return <Redirect to="/" exact />;

		if(this.state.loading)
			return <LinearProgress/>

		const { classes } = this.props;
		const handleClose = (event, reason) => {
			if(this.state.openSuccess){
				this.setState({openSuccess: false});
			}
			else if(this.state.openInfo){
				this.setState({openInfo: false});
			}
			else if(this.state.openFailure){
				this.setState({openFailure: false});
			}
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
		          <b>Forget Password</b>
		        </Typography>
	            <form className={classes.form} onSubmit={this.submitForm}>
	              <TextField
	                type="email"
	                variant="filled"
	                margin="normal"
	                required
	                fullWidth
	                id="email"
	                label="email"
	                value={this.state.email}
	                onChange={this.handleChange("email")}
	                className={classes.fields}
	                
	              />
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
				<Snackbar open={this.state.openSuccess} onClose={handleClose}>
					<Alert onClose={handleClose} severity="success">
					{this.state.msg}
					</Alert>
				</Snackbar>
				<Snackbar open={this.state.openInfo} onClose={handleClose}>
					<Alert onClose={handleClose} severity="info">
					{this.state.msg}
					</Alert>
				</Snackbar>
				<Snackbar open={this.state.openFailure} onClose={handleClose}>
					<Alert onClose={handleClose} severity="error">
						{this.state.msg}
					</Alert>
				</Snackbar>
	  
	          </Container>
	        </div>
	      </React.Fragment>
		)
	}
}


export default withStyles(useStyles)(forgetPassword);