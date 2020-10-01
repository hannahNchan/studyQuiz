import React, { useEffect, useState } from 'react';
import { getAssignature } from '../../api/api';

import Stepper from '../../components/Stepper';

import './styles.css';

const QuizSubject = ({ url }) => {
  const [state, setState] = useState({ arrayQuiz: [], unmounted: false });

  useEffect(() => {
    getAssignature('materias','assignatures').then(response => {
      setState({ ...state, arrayQuiz: response.data()[url] })
    }); 
    return () => {
      setState({ ...state, unmounted: true });
    };
  }, [url])


  return (
    <div className="hannah-card-quiz">
      {state.arrayQuiz.length !== 0 && (
        <Stepper 
          maxSteps={state.arrayQuiz.length} 
          data={state.arrayQuiz} 
          unmounted={state.unmounted}
        />
      )}
    </div>
  )
    
};

export default QuizSubject;

