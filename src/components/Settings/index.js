import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

export default function SettingsList({ urlSelected }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];


    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List subheader={<ListSubheader>Editar</ListSubheader>} className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <AutorenewIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Cuestionario aleatorio" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle('wifi')}
            checked={checked.indexOf('wifi') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/*<BluetoothIcon />*/}
        </ListItemIcon>
        <ListItemText id="switch-list-label-bluetooth" primary="Eliminar asignatura" />
        <ListItemSecondaryAction>
          <IconButton color="secondary" fontSize="large" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/*<BluetoothIcon />*/}
        </ListItemIcon>
        <ListItemText id="switch-list-label-bluetooth" primary="Editar cuestionario" />
        <ListItemSecondaryAction>
          <IconButton color="primary" fontSize="large" aria-label="delete"  onClick={() => urlSelected()} >
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

