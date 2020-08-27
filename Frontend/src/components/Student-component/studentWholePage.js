import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StudentContent from './StudentContent';

function TabPanel(props) {
		const { children, value, index, ...other } = props;
	
		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`vertical-tabpanel-${index}`}
				aria-labelledby={`vertical-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box p={3}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}
	
	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.any.isRequired,
		value: PropTypes.any.isRequired,
	};

	function a11yProps(index) {
		return {
			id: `vertical-tab-${index}`,
			'aria-controls': `vertical-tabpanel-${index}`,
		};
	}
	
	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.paper,
			display: 'flex',
		},
		// tabs: {
		//   borderRight: `1px solid ${theme.palette.divider}`,
		// },
		TabPanel:{
				//borderLeft:`1px solid ${theme.palette.divider}`,
				display: "block",
				margin:"auto"
		},
		grid:{
			borderRight:`1px solid ${theme.palette.divider}`
		}
	}));

const StudentWholePage = () => {

		const classes = useStyles();
		const [value, setValue] = React.useState(0);

		const handleChange = (event, newValue) => {
				setValue(newValue);
		};

		return ( 
				<React.Fragment>
						<Grid container>
								<div className={classes.root}>
										<Grid item xs="2" className={classes.grid}>
												<Tabs
														orientation="vertical"
														value={value}
														onChange={handleChange}
														aria-label="Vertical tabs example"
														className={classes.tabs}
												>
														<Tab label="Home" {...a11yProps(0)} />
														<Tab label="Preferences" {...a11yProps(1)} />
														<Tab label="Item Three" {...a11yProps(2)} />
														<Tab label="Item Four" {...a11yProps(3)} />
														<Tab label="Item Five" {...a11yProps(4)} />
														<Tab label="Item Six" {...a11yProps(5)} />
														<Tab label="Item Seven" {...a11yProps(6)} />
												</Tabs>
										</Grid>
										<Grid className={classes.TabPanel} item xs="8">
												<TabPanel value={value} index={0}>
													Home
												</TabPanel>
												<TabPanel value={value} index={1}>
													<StudentContent />
												</TabPanel>
												<TabPanel value={value} index={2}>
														Item Three
												</TabPanel>
												<TabPanel value={value} index={3}>
														Item Four
												</TabPanel>
												<TabPanel value={value} index={4}>
														Item Five
												</TabPanel>
												<TabPanel value={value} index={5}>
														Item Six
												</TabPanel>
												<TabPanel value={value} index={6}>
														Item Seven
												</TabPanel>
										</Grid>
										<Grid item xs="2"></Grid>
								</div>
						</Grid>
				</React.Fragment>
		 );
}
 
export default StudentWholePage;