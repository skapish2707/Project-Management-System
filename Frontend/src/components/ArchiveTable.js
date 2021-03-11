import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Grid, Button, Divider } from '@material-ui/core';
import SERVER_URL from "../Pages/URL"

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const {row} = props;
  const project = row.project
  const members = row.members
  const Ad = row.addtionalDocuments
  const guide = row.guide
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment key={row._id}>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.acadYear}
        </TableCell>
        <TableCell align="left">{project.title}</TableCell>
        <TableCell align="left">{project.category}</TableCell>
        <TableCell align="left">{project.typeOfProject}</TableCell>
        </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
            <Typography variant="h6" component="div">
               Member Details:
              </Typography>
               <Table size="small" aria-label="purchases">
                  <TableHead>
                   <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                   </TableRow>
                  </TableHead>
                <TableBody>
                 {members.map((mem) => (
                    <TableRow key={mem._id}>
                      <TableCell key={mem.name} component="th" scope="row">
                        {mem.name}
                      </TableCell>
                      <TableCell key={mem.name}>{mem.email}</TableCell>
                    </TableRow>
                  ))}                
                </TableBody>
               </Table>
               <br/>
               <Typography variant="h6" gutterBottom>Guide Details:</Typography>  
               <Grid container>
                  <Grid item xs={12}><b>Name:</b>&nbsp;&nbsp;{guide.name}</Grid>
                  <Grid item xs={12}><b>Email:</b>&nbsp;&nbsp;{guide.email}</Grid>
               </Grid> 
               <br/>
               <Divider/>                
              <Typography variant="h6" component="div">Additional Documents:</Typography>
              {Ad.length === 0 ? (
                <>
                <Typography>No Additional Document Uploaded</Typography>
                <br/>
                </>
              ) : (
              <React.Fragment>
                <Grid container style={{backgroundColor: "#fff", padding: "5px",textAlign: "left"}}>
                    <Grid item xs={3}>
                      <b>Title</b></Grid>
                    <Grid item xs={6}><b>Description</b></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2} style={{ textAlign: "centre" }}><b>File Link</b></Grid>
                </Grid>
                  {Ad.map(ad => {
                    return (
                      <>
                      <Divider/>
                      <Grid container key={ad._id} style={{backgroundColor: "#fff", padding: "5px", textAlign: "left"}}>
                        <Grid item xs={3}>{ad.docName}</Grid>
                        <Grid item xs={6}>{ad.desc}</Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={2}><a href={ad.doclink} style={{ textDecoration: "none" }} target="_blank">
                          <Button variant="outlined" color="primary" size="small">Show Document</Button></a>
                        </Grid>
                      </Grid>                      
                      </>
                    );
                  })}
                  <br/>
              </React.Fragment>
              )}
              <Divider/>           
              <Typography variant="h6" gutterBottom component="div">
               Project Details:
              </Typography>
              <Grid container>
                <Grid item xs={12}><b>Title Of Project:</b>&nbsp;&nbsp;{project.title}</Grid>
                <Grid item xs={12}><b>Statement Of Problem:</b>&nbsp;&nbsp;{project.details}</Grid>
                <Grid item xs={12}><b>Domain Of Specialization:</b>&nbsp;&nbsp;{project.specialization}</Grid>
                <Grid item xs={12}><b>Result Expected:</b>&nbsp;&nbsp;{project.result}</Grid>
                <Grid item xs={12} sm={6}>
                 <br/>
                 <Button variant="outlined" size="small" color="primary" onClick={() => { window.open(`${SERVER_URL}/${project.attachPrints}`);}}>
                   
                   Show Uploaded Document
                 </Button>
               </Grid>
              </Grid>
              <br/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ArchiveTable(props) {
  const {archData} = props
  return (
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Academic Year</TableCell>
            <TableCell align="left">Project Title</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Type Of Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {archData.map((row) => (
            <Row key={row._id}  row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{height:"150px"}}></div>
    </React.Fragment>
  );
}