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
        if(Presentations.length!==0){
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
                                    <TableCell align="center">Organisation</TableCell>
                                    <TableCell align="center">Subject Knowledge</TableCell>
                                    <TableCell align="center">Effectiveness of delivery</TableCell>
                                    <TableCell align="center">Time Management</TableCell>
                                    <TableCell align="center">Marks</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Presentations.map((Presentation,index) => (
                                    <TableRow key={Presentation._id}>
                                        <TableCell align="center">{index+1}</TableCell>
                                        <TableCell align="center">{new Date(Presentation.scheduled_date).getDate()}/{new Date(Presentation.scheduled_date).getMonth()+1}/{new Date(Presentation.scheduled_date).getFullYear()}</TableCell>
                                        {(!Presentation.filled)?(
                                            <React.Fragment>
                                                {new Date(Presentation.scheduled_date).getTime()>Date.now()?(
                                                    <React.Fragment>
                                                        <TableCell align="center">-</TableCell>
                                                        <TableCell align="center">-</TableCell>
                                                        <TableCell align="center">-</TableCell>
                                                        <TableCell align="center">-</TableCell>
                                                        <TableCell align="center">Presentation Not conducted</TableCell>
                                                    </React.Fragment>
                                                ):(
                                                    <React.Fragment>
                                                        <TableCell align="center">-</TableCell>
                                                        <TableCell align="center">-</TableCell>
                                                        <TableCell align="center">-</TableCell>
                                                        <TableCell align="center">-</TableCell>
                                                        <TableCell align="center">
                                                            <Typography style={{fontSize:"12"}} color="secondary">
                                                                Presentation missing
                                                            </Typography>
                                                        </TableCell>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ):(
                                            <React.Fragment>
                                                <TableCell align="center">
                                                    {Presentation.orgMarks}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {Presentation.subKnowMarks}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {Presentation.EODMarks}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {Presentation.timeMarks}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {Presentation.orgMarks+Presentation.timeMarks+Presentation.EODMarks+Presentation.subKnowMarks}/10
                                                </TableCell>
                                            </React.Fragment>
                                        )}
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ThemeProvider>
                </React.Fragment>
            )
        }else{
            return(
                <Typography>
                    No Presentations have been scheduled. Please check later or contact your Faculty
                </Typography>
            )
        }
    }
}
 
export default StudentPresentation;