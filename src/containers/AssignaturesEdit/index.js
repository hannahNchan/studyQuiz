import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";

import Lists from '../../components/Lists';
import QuizSubject from '../QuizSubject';
import { getAllAssignaturesAction } from '../../redux/studyDuck';

const useStyles = makeStyles({
  root: {
    marginBottom: '20px'
  }
});

const AssignaturesLists = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState({
    assignatures: [],
    list: 'subjects',
    arrayQuiz: [],
    url: ''
  });

  const getInfo = useSelector(store => store.studyData.allAssignatures);

  useEffect(() => {
    dispatch(getAllAssignaturesAction())
  },[]);
  
  const onHandleClick = url => {
    history.push(`/materiaQuiz/${url}`);
  };

  return (
    <>
      {getInfo.length !== 0 && getInfo.map(item => {
          return (
            <div>
              <Lists 
                dataAssignature={item}
                editable
              /> 
            </div>
          )
        })
      }
    </>
  )
}

export default AssignaturesLists;

