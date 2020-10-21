import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(1, 2, 0),
    color: '#90caf9',
    fontFamily: 'unset',
    fontSize: '1.5rem',
    fontVariant: 'small-caps',
    fontWeight: 900,
  },
  paper: {
    backgroundColor: 'transparent',
    paddingBottom: '0px !important',
    boxShadow: '0 0 transparent',
    textAlign: 'center',
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

const AppBarBottom = ({ button, title, assignature, onHandleClick }) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <span className={classes.text}>
          {assignature}
        </span>
      </Paper>
      <AppBar style={{ backgroundColor: '#90caf9' }} position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          {/*<IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>*/}
          {button && (
            <Fab color="primary" onClick={() => onHandleClick()} color="secondary" aria-label="add" className={classes.fabButton}>
                  <AddIcon />
            </Fab>
          )}
          <div className={classes.grow} />
          {title && <p>{title}</p>}
          {/*<IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>*/}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AppBarBottom;

