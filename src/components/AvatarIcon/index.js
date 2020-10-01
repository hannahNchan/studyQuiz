import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `1px solid ${theme.palette.background.paper}`,
    color: 'black',
    backgroundColor: '#90caf9',
    fontSize: '13px',
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const AvatarIcon = ({ IconAssignature, total }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        badgeContent={total !== 0 && <SmallAvatar>{total}</SmallAvatar>}
      >
        <Avatar
          className={classes.large}
        >
          { IconAssignature }
        </Avatar>
      </Badge>
    </div>
  );
}

export default AvatarIcon;

