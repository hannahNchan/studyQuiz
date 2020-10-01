import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from "react-router-dom";

import { getAssignatureAction } from '../../redux/studyDuck';
import Stepper from '../../components/Stepper';
import AppBarMenu from '../../components/AppBarMenu';

import './styles.css';

const MateriaQuiz = ({ match }) => {
  let history = useHistory();
  const dispatch = useDispatch();

  const getSubject = useSelector(store => store.studyData.subject);

  useEffect(() => {
    dispatch(getAssignatureAction(match.params.url))
  },[]);

  const onHandleBack = () => {
    history.goBack();
  };

  return (
    <>
      <AppBarMenu title="Quiz" icon={<KeyboardBackspaceIcon onClick={() => onHandleBack()} />} />
      <div className="hannah-card-quiz">
        {getSubject.length !== 0 && (
          <Stepper 
            maxSteps={getSubject.length} 
            data={getSubject} 
          />
        )}
      </div>
    </>
  )
}

export default MateriaQuiz
