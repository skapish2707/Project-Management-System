import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((themes) => ({

}))

let Group = null

const studentAdditionalDoc = (props) =>{
    Group = props.Group
    const classes = useStyles();
    if(Group===null){
        return (
            <div style={{ margin: "auto" }}>
                <CircularProgress />
            </div>
        );
    }else{
        return(
            <React.Fragment>
                <Typography>
                    Here you can add certificates related to your project,black book,etc.
                </Typography>
            </React.Fragment>
        )
    }
}