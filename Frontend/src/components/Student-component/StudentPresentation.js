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
let members = null

const StudentPresentation = (props) => {
    const classes = useStyles();
    Group=props.Group;
    console.log(Group)
    Presentations=Group.presentation
    members=Group.members
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
                        <Typography variant="h4" style={{margin:"5px 0px 20px 0px"}}>Presentation Details</Typography>
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
                                    <TableCell align="center">Time</TableCell>
                                    {/* <TableCell align="center" style={{padding:"8px"}}>Roll No</TableCell>
                                    <TableCell align="center">Organisation</TableCell>
                                    <TableCell align="center">Subject Knowledge</TableCell>
                                    <TableCell align="center">Effectiveness of delivery</TableCell>
                                    <TableCell align="center">Time Management</TableCell>
                                    <TableCell align="center">Marks</TableCell> */}
                                    <TableCell align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Presentations.map((Presentation,index) => (
                                    <TableRow key={Presentation._id}>
                                        <TableCell align="center">{index+1}</TableCell>
                                        <TableCell align="center">{new Date(Presentation.scheduled_date).getDate()}/{new Date(Presentation.scheduled_date).getMonth()+1}/{new Date(Presentation.scheduled_date).getFullYear()}</TableCell>
                                        <TableCell align="center">{Presentation.scheduled_date.split("T")[1].split(".")[0]}</TableCell>
                                        {Presentation.marks.length === 0 ? (
                                            <React.Fragment>
                                                <TableCell align="center">
                                                    <Typography color="error">Presentation not conducted</Typography>
                                                </TableCell>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <TableCell align="center"> 
                                                    <Typography style={{color:"green"}}>Presentation conducted</Typography>
                                                </TableCell>
                                            </React.Fragment>
                                        )}
                                        {/* <TableCell>
                                            <TableContainer>
                                                    <Table>
                                                        <TableBody>
                                                            {members.map(member=>(
                                                                <TableRow key={member.id}>
                                                                    <TableCell align="center" style={{padding:"8px"}}>{member.rollno}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                            </TableContainer>
                                        </TableCell>
                                        {(Presentation.marks.length===0)?(
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
                                                <TableCell>
                                                    {Presentation.marks.map((marks) => (
                                                        <TableContainer>
                                                                <Table>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell align="center" style={{padding:"8px"}}>{marks.orgMarks}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                        </TableContainer>
                                                    ))}
                                                </TableCell>
                                                <TableCell>
                                                    {Presentation.marks.map((marks) => (
                                                        <TableContainer>
                                                                <Table>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell align="center" style={{padding:"8px"}}>{marks.EODMarks}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                        </TableContainer>
                                                    ))}
                                                </TableCell>
                                                <TableCell>
                                                    {Presentation.marks.map((marks) => (
                                                        <TableContainer>
                                                                <Table>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell align="center" style={{padding:"8px"}}>{marks.subKnowMarks}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                        </TableContainer>
                                                    ))}
                                                </TableCell>
                                                <TableCell>
                                                    {Presentation.marks.map((marks) => (
                                                        <TableContainer>
                                                                <Table>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell align="center" style={{padding:"8px"}}>{marks.timeMarks}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                        </TableContainer>
                                                    ))}
                                                </TableCell>
                                                <TableCell>
                                                    {Presentation.marks.map((marks) => (
                                                        <TableContainer>
                                                                <Table>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell align="center" style={{padding:"8px"}}>{marks.orgMarks+marks.subKnowMarks+marks.EODMarks+marks.timeMarks}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                        </TableContainer>
                                                    ))}
                                                </TableCell>
                                            </React.Fragment>
                                        )} */}
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




