import { CircularProgress, createMuiTheme, makeStyles, Paper, responsiveFontSizes, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react';


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles(theme => ({
    tableContainer: {
        marginTop: "10px",
        marginBottom: "50px"
      },
      table: {
        minWidth: 650
      }
  }));

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let Group=null;
let Presentations = null;

const StudentPresentation = (props) => {
    const classes = useStyles();
    Group=props.Group;
    Presentations=Group.presentation
    Presentations.sort((a,b)=>(new Date(a.scheduled_date).getTime()>new Date(b.scheduled_date).getTime())?1:-1)
    if(Group===null){
        return(
            <React.Fragment>
                <CircularProgress />
            </React.Fragment>
        )
    }else{
        console.log(Group)
        return(
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4">Presentation Details</Typography>
                    <TableContainer
                        style={{ backgroundColor: "#d3d3d3" }}
                        className={classes.tableContainer}
                        component={Paper}
                    >
                        <Table
                        className={classes.table}
                        size="small"
                        aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow>
                                <TableCell align="center">No.</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Day</TableCell>
                                <TableCell align="center">Time</TableCell>
                                <TableCell align="center">Marks</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Presentations.map((Presentation,index) => (
                                <TableRow key={Presentation._id}>
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{new Date(Presentation.scheduled_date).getDate()}/{new Date(Presentation.scheduled_date).getMonth()+1}/{new Date(Presentation.scheduled_date).getFullYear()}</TableCell>
                                    <TableCell align="center">{days[new Date(Presentation.scheduled_date).getDay()]}</TableCell>
                                    {(new Date(Presentation.scheduled_date).getHours()>12)?(
                                        <TableCell align="center">
                                            {new Date(Presentation.scheduled_date).getHours()-12}:{new Date(Presentation.scheduled_date).getMinutes()} pm 
                                        </TableCell>
                                    ):(
                                        <TableCell align="center">
                                            {new Date(Presentation.scheduled_date).getHours()}:{new Date(Presentation.scheduled_date).getMinutes()} am 
                                        </TableCell>
                                    )}
                                    {(Presentation.marks===null)?(
                                        <React.Fragment>
                                            {new Date(Presentation.scheduled_date).getTime()>Date.now()?(
                                                <TableCell align="center">
                                                    Presentation Not conducted
                                                </TableCell>
                                            ):(
                                                <TableCell align="center">
                                                    <Typography style={{fontSize:"12"}} color="secondary">
                                                        Presentation missed
                                                    </Typography>
                                                </TableCell>
                                            )}
                                        </React.Fragment>
                                    ):(
                                        <TableCell align="center">
                                            {Presentation.marks}
                                        </TableCell>
                                    )}
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ThemeProvider>
            </React.Fragment>
        )
        
    }
}
 
export default StudentPresentation;