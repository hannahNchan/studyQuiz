import React from 'react';
import HomeIcon from '@material-ui/icons/Home';

import TabSelector from '../../components/TabsSelector';
import AssignaturesList from '../AssignaturesList/';
import AssignaturesEdit from '../AssignaturesEdit/';
import AppBarMenu from '../../components/AppBarMenu';

const MainSelector = ({ history }) => {
  return ( 
    <>
      <AppBarMenu title="Study Quiz" />
      <TabSelector 
        AssignaturesList={<AssignaturesList />}
        AssignaturesEdit={<AssignaturesEdit />}
      />
    </>
  )
};

export default MainSelector;

