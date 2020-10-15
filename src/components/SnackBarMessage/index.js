import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  alert: {
    width: '-webkit-fill-available',
    margin: '0px 10px',
  },
}));

const SnackBarMessage = props => {
  const { duration = 2000, severity, message, returnOpen, open } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    returnOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert className={classes.alert} onClose={handleClose} severity={severity} >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBarMessage;

