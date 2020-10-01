import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import EditableLists from './EditableLists';
import NormalLists from './NormalLists';
import './styles.css';
import {Card} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '0px',
  },
  card: {
    margin: '15px',
  },
}));

const Lists = (data) => {

  const renderListOptional = () => {
    if (data.editable) {
      return (
        <Card className={classes.card}>
          <EditableLists dataAssignature={data.dataAssignature} /> 
        </Card>
      )
    } else {
      return <NormalLists dataAssignature={data.dataAssignature} />
    }
  };

  const classes = useStyles();

  return (
    <List className={classes.root}>
      {renderListOptional()}
    </List>
  );
}

export default Lists;

