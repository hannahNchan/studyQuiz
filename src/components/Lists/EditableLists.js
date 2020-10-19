import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsList from '../Settings';
import { useHistory } from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import { updateSubject } from '../../api/api.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(0),
    backgroundColor: '#f7f8f9',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: 'inherit',
    justifyContent: 'space-around',
    margin: '20px 0px',
  },
  delete: {
    color: 'red',
  },
  chip: {
    marginRight: '20px',
  },
}));

const EditableLists = ({ dataAssignature, deleteSubject }) => {
  let history = useHistory();
  const { url, description, title, quantity } = dataAssignature;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const onHandleClick = url => {
    history.push(`/subjectEdition/${url}`);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
        <Chip 
          className={classes.chip}
          icon={<FaceIcon />} 
          label={<p>{`Reactivos:${' '}${quantity}`}</p>}
          variant="outlined" 
          color="primary"
          color="primary"
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested}>
            <SettingsList 
              url={url} 
              deleteSubject={() => deleteSubject(url)} 
              urlSelected={() => onHandleClick(url)} 
            />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}

export default EditableLists;

