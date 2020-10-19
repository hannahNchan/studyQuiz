import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from "react-router-dom";

import { getAssignatureAction } from '../../redux/studyDuck';
import Stepper from '../../components/Stepper';
import AppBarMenu from '../../components/AppBarMenu';
import NoData from '../../assets/svg/noData.svg';
import AppBarBottom from '../../components/AppBarBottom';

import './styles.css';

const MateriaQuiz = ({ match }) => {
  let history = useHistory();
  const dispatch = useDispatch();

  const getSubject = useSelector(store => store.studyData.subject);

  useEffect(() => {
    dispatch(getAssignatureAction(match.params.url));
  },[]);

  const onHandleBack = () => {
    history.goBack();
  };

  return (
    <>
      <AppBarMenu title="Quiz" icon={<KeyboardBackspaceIcon onClick={() => onHandleBack()} />} />
      <div className="hannah-card-quiz">
        {getSubject && getSubject.length !== 0 && (
          <Stepper 
            maxSteps={getSubject.length} 
            data={getSubject} 
          />
        ) || (
          <div className="hannah-container">
            <img src={NoData} alt="No data avalaible" className="hannah-no-data" />
            <p>Ups, agrega reactivos para estudiar !</p>
          </div>
        )}
      </div>
      <AppBarBottom title={match.params.title} color={'#90caf9'} />
    </>
  )
}

export default MateriaQuiz
