import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	title: {
		flexGrow: 1,
		textAlign: "left",
		margin :theme.spacing(2)
	},
}));



const Navbar = () => {
	const classes = useStyles();

	return (
		<div >
			<AppBar position="static" style={{ backgroundColor: "#000" }}>
				<Typography variant="h5" className={classes.title}>
				Project Management System
				</Typography>
			</AppBar>
		</div>
	);
};

export default Navbar;


// <div className="context">
//         <h1>Project Management System</h1>
//       </div>
   
//       <div className="area">
//         <ul className="circles">
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//         </ul>
//       </div>