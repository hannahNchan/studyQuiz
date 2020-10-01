import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {Card, Divider, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { getAssignatureAction, addAssignatureAction, removeAssignatureAction } from '../../redux/studyDuck';
import AppBarMenu from '../../components/AppBarMenu';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '15px',
  },
  details: {
    backgroundColor: '#f7f7f7',
  },
  content: {
    width: '100%',
  },
  field: {
    marginTop: '12px',
    marginBottom: '13px',
  },
  footer: {
    marginTop: '15px',
    textAlign: 'right',
  },
  addButton: {
    position: 'inherit',
    textAlign: 'center',
  },
}));


const SubjectEdition = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getLists = useSelector(store => store.studyData.subject);

  const [state, setState] = useState({
    quiz: []
  })

  useEffect(() => {
    dispatch(getAssignatureAction(match.params.url))
  },[])

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleRemoveReactive = item => {
    dispatch(removeAssignatureAction(item));
  };

  const handleAddReactive = () => {
    dispatch(addAssignatureAction({
        question:'', 
        answer: '',
      }
    ));
  };

  const onHandleBack = () => {
    history.goBack();
  };

  return (
    <>
      <AppBarMenu title="Evaluación" icon={<KeyboardBackspaceIcon onClick={() => onHandleBack()} />} />
      {getLists && getLists.length !== 0 &&
        getLists.map((item, index) => {
          return (
            <Accordion className={classes.form}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={`panel${index}a-header`}
              >
                {`Reactivo No. ${index}`}
              </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <div className={classes.content}>
                <FormControl fullWidth>
                  <TextField
                    id={`question-helperText-${index}`}
                    label={`Pregunta No. ${index + 1}`}
                    defaultValue={item.question}
                  />
                  <Divider className={classes.field} />
                  <TextField
                    id={`answer-helperText-${index}`}
                    label={`Respuesta No. ${index + 1}`}
                    defaultValue={item.answer}
                  />
                </FormControl>
                <div className={classes.footer}>
                  <IconButton onClick={() => handleRemoveReactive(index)} style={{ color: 'red' }} aria-label="delete">
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          )
        })
      }
      <div className={classes.addButton}>
        <Button variant="outlined" color="primary" onClick={() => handleAddReactive()}>
          Agregar reactivo
        </Button>
      </div>
    </>
  )
}

export default SubjectEdition
