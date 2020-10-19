import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonPage,
  IonRouterOutlet,
} from '@ionic/react';
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'

import Login from './containers/Login';
import MainSelector from './containers/MainSelector';
import MateriaQuiz from './containers/MateriaQuiz';
import SubjectEdition from './containers/SubjectEdition';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './styles.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const App = () => {
  return (
    <Router>
      <IonApp>
        <IonPage>
          <IonRouterOutlet>
            <Route exact path="/" component={Login} />
            <Route path="/selector" component={MainSelector} />
            <Route path="/materiaQuiz/:url/:title" component={MateriaQuiz} />
            <Route path="/subjectEdition/:url:title" component={SubjectEdition} />
          </IonRouterOutlet>
        </IonPage>
      </IonApp>
    </Router>
  )
};

export default App;
