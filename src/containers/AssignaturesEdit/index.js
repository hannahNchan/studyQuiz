import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ResponsiveDialogMessage from '../../components/Dialog';
import TextField from '@material-ui/core/TextField';
import SnackBarMessage from '../../components/SnackBarMessage';
import slugify from 'slugify';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';

import Lists from '../../components/Lists';
import QuizSubject from '../QuizSubject';
import { getAllAssignaturesAction } from '../../redux/studyDuck';
import { createDocument, deleteAssignature, updateSubject, updateAssignatures } from '../../api/api.js';

import './styles.css';

const useStyles = makeStyles({
  root: {
    marginBottom: '20px'
  },
  snack: {
    marginRight: '20px',
    marginTop: '300px',
  },
});

const AssignaturesLists = match => {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState({
    assignatures: [],
    list: 'subjects',
    arrayQuiz: [],
    url: '',
    open: false,
    nameNew: '',
    description: '',
  });

  const [openSnack, setOpenSnack] = useState(false);
  const [deletedSubject, setDeletedSubject] = useState(null);
  const [openPrompt, setOpenPrompt] = useState(false);

  const getInfo = useSelector(store => store.studyData.allAssignatures);

  useEffect(() => {
    dispatch(getAllAssignaturesAction())
  },[]);

  useEffect(() => {
    setState({ ...state, assignatures: [...getInfo]  })
  },[getInfo]);

  const onHandleClick = url => {
    history.push(`/materiaQuiz/${url}`);
  };

  const onHandleDeleteSubject = url => {
    setDeletedSubject(url);
    setOpenPrompt(true);
  };

  const onHandleAcceptPrompt = () => {
    const newSubjects = returnNewArray(deletedSubject);
    setState({
      ...state,
      assignatures: newSubjects,
    });
    deleteAssignature('subjects', deletedSubject);
    onHandleClosePrompt();
    setOpenSnack(true);
  };

  const onHandleClosePrompt = () => {
    setOpenPrompt(false);
  };

  const onHandleCancelModal = () => {
    setState({ ...state, open: false });
  };

  const returnNewArray = url => {
    let tempArray = [...state.assignatures];
    tempArray.find((item, index) => item.url === url && tempArray.splice(index, 1));
    return tempArray
  };

  const onHandleAcceptModal = () => {
    const assignature = {
      description: state.description,
      icon: '',
      quantity: 0,
      title: state.nameNew,
      url: slugify(state.nameNew, {
        replacement: '-',
        lower: true,
      }),
    };
    createDocument('quiz', assignature.url);
    const newState = [...state.assignatures];
    newState.push(assignature);
    setState({
      ...state,
      open: false,
      assignatures: [...state.assignatures, assignature],
    });
    setOpenSnack(true);
    updateSubject('subjects', assignature.url, {[assignature.url]: assignature}, { merge:true } );
  };

  const onHandleTextChange = ({ target }) => {
    setState({ ...state, nameNew: target.value });
  };

  const onHandleDescriptionChange = ({ target }) => {
    setState({ ...state, description: target.value });
  };

  const onHandleReturnOpen = status => {
    setOpenSnack(status);
  };

  const addAssignature = () => {
    setState({ ...state, open: true });
  };

  const isDisabled = state.description !== '' && state.title !== '';

  return (
    <>
      {state.assignatures.length !== 0 && state.assignatures.map(item => {
          return (
            <div>
              <Lists
                dataAssignature={item}
                editable
                deleteSubject={(url) => onHandleDeleteSubject(url)}
              />
            </div>
          )
        })
      }
      <ResponsiveDialogMessage
        title="Nueva asignatura"
        open={state.open}
        handleCloseModal={() => onHandleCancelModal()}
        handleAcceptModal={() => onHandleAcceptModal()}
        disabled={!isDisabled}
      >
        <TextField
          autocomplete="off"
          onChange={onHandleTextChange}
          autoFocus
          margin="dense"
          id="description"
          type="text"
          fullWidth
          variant="outlined"
          required
          label="Escriba el nombre"
        />
        <Divider />
        <TextField
          onChange={onHandleDescriptionChange}
          required
          variant="outlined"
          fullWidth
          id="standard-multiline-static"
          label="Escriba una descripción"
          multiline
          rows={6}
        />
      </ ResponsiveDialogMessage>
      <div className="hannah-container">
        <Button
          size="large"
          variant="contained"
          color="primary"
          disableElevation
          onClick={addAssignature}
        >
          Agregar Asignatura
        </Button>
      </div>
      <ResponsiveDialogMessage 
        title="Advertencia !" 
        content="Se eliminará la materia!"
        open={openPrompt} 
        handleCloseModal={onHandleClosePrompt} 
        handleAcceptModal={() => onHandleAcceptPrompt()} 
      />
      <div className={classes.snack}>
        <SnackBarMessage
          severity="success"
          message="Cambios Guardados"
          returnOpen={onHandleReturnOpen}
          open={openSnack}
          duration={2000}
        />
      </div>
    </>
  )
}

export default AssignaturesLists;

