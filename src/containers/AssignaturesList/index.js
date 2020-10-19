import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';

import Lists from '../../components/Lists';
import QuizSubject from '../QuizSubject';
import { getAllAssignaturesAction } from '../../redux/studyDuck';
import empty from '../../assets/images/nothing.png';

import './styles.css';

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
  
  const onHandleClick = (url, title) => {
    history.push(`/materiaQuiz/${url}/${title}`);
  };

  return (
    <span>
      {getInfo.length !== 0 && getInfo.map(item => {
          return (
            <span key={item.url} onClick={() => onHandleClick(item.url, item.title)}>
              <Lists 
                dataAssignature={item}
                editable={false}
              /> 
            </span>
          )
        })
      || 
        (<div className="hannah-container">
          <img src={empty} /> 
          <p>No hay nada por acá, agrega una asignatura</p>
        </div>)
      }
    </span>
  )
}

export default AssignaturesLists;

