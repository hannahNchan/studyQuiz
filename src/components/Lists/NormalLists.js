import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AvatarIcon from '../AvatarIcon';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
    marginLeft: '10px',
  },
  line: {
    width: '80%',
  },
  subject: {
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
  },
  header: {
    paddingTop: '10px',
    marginLeft: '10px',
    fontSize: '1rem',
  },
}));

const NormalLists = ({ dataAssignature }) => {
  const { description, title, quantity } = dataAssignature;
  const classes = useStyles();

  return (
    <>
      <ListItem button alignItems="flex-start"  className={classes.subject} >
        <ListItemAvatar>
          <AvatarIcon 
            IconAssignature={<span className="iconText"><i className="fas fa-bacteria"></i></span>}
            total={quantity}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="h6" 
              gutterBottom
              className={classes.header}
              component="span"
              noWrap
            >
              {title}
            </Typography>
          }
          secondary={
            <>
              <Typography
                display="block" 
                gutterBottom
                component="span"
                variant="caption"
                className={classes.inline}
                color="textPrimary"
              >
                {description}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider 
        variant="inset" 
        component="li" 
        className={classes.line}
      />
    </>
  );
}

export default NormalLists;


