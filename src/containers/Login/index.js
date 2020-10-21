import React from "react"
import GoogleButton from 'react-google-button'
import Grid from '@material-ui/core/Grid';

import logo from '../../assets/images/logo.svg';
import { getLogin } from '../../auth';

import './styles.css';

const Login = ({ history }) => {
  return (
    <div className="hannah-login">
      <Grid container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <img className="hannah-logo" src={logo} alt="Logo" style={{ paddingBottom: '0px' }} />
        <div style={{ width: '70%' }}>
          <p className="hannah-mini-pargraph">An free application to study any subject you need, anywhere, anytime</p>
        </div>
        <GoogleButton
          label="Entrar con Google"
          type="light"
          onClick={(e) => {
              e.preventDefault();
              getLogin();
            //history.push('/selector');
            }
          }
        />
        <p className="hannah-footer">2020 studyQuiz developed by Hannah-Tech v1.0.0</p>
      </Grid>
    </div>
  )
};

export default Login;

