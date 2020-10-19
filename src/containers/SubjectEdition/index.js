import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SaveIcon from "@material-ui/icons/Save";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import {
  getAssignatureAction,
} from "../../redux/studyDuck";
import AppBarMenu from "../../components/AppBarMenu";
import { updateAssignatures, createDocument } from "../../api/api.js";
import ResponsiveDialogMessage from "../../components/Dialog";
import SnackBarMessage from "../../components/SnackBarMessage";

import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "transparent",
  },
  inline: {
    display: "inline",
  },
  addButton: {
    //position: "inherit",
    textAlign: "center",
    marginTop: '20px',
    position: 'fixed',
    height: '60px',
    bottom: '40px',
    right: '40px',
  },
  element: {
    backgroundColor: "#f1f1f1",
  },
  separator: {
    backgroundColor: "white",
    height: "3px",
  },
  icon: {
    display: "flex",
    flexDirection: "column",
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  scroll: {
    height: '-webkit-fill-available',
    overflowY: 'scroll',
  },
}));

const SubjectEdition = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getLists = useSelector((store) => store.studyData.subject);
  const loadBar = useSelector((store) => store.studyData.loadBar);

  const [state, setState] = useState({ quiz: [] });
  const [quizModified, setQuizModified] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    dispatch(getAssignatureAction(match.params.url));
  }, []);

  useEffect(() => {
    if (getLists && getLists.length !== 0) {
      setState({ ...state, quiz: [...getLists] });
      setQuizModified([...getLists]);
    }
  }, [getLists]);

  const [open, setOpen] = React.useState(false);

  const onHandleCloseModal = () => {
    setOpen(false);
  };

  const onHandleReturnOpen = (status) => {
    setOpenSnack(status);
  };

  const onHandleAcceptModal = () => {
    onHandleCloseModal();
    const erased = [
      ...state.quiz.filter((item, index) => index !== itemSelected),
    ];
    setState({ ...state, quiz: erased });
    updateAssignatures("quiz", match.params.url, { quizly: erased });
    setOpenSnack(true);
  };

  const handleRemoveReactive = (item) => {
    setOpen(true);
    setItemSelected(item);
  };

  const handleSaveReactive = () => {
    updateAssignatures("quiz", match.params.url, { quizly: state.quiz });
  };

  const handleAddReactive = () => {
    const getAssignatures = [...state.quiz];
    getAssignatures.push({
      question: "",
      answer: "",
    });
    setState({ ...state, quiz: [...getAssignatures] })
  };

  const onHandleBack = () => {
    history.goBack();
  };

  const handleChangeQuestion = (event, item) => {
    const { value } = event.target;
    let tempArray = [...state.quiz];
    tempArray[item].question = value;
    setQuizModified([...tempArray]);
  };

  const handleChangeAnswer = (event, item) => {
    const { value } = event.target;
    let tempArray = [...state.quiz];
    tempArray[item].answer = value;
    setQuizModified([...tempArray]);
  };

  return (
    <>
      <AppBarMenu
        title="Editar evaluación"
        icon={<KeyboardBackspaceIcon onClick={() => onHandleBack()} />}
      />
      <div className={classes.scroll}>
        <List>
          {state.quiz.map((item, index) => {
            return (
              <>
                <ListItem
                  className={classes.element}
                  key={index}
                  alignItems="flex-start"
                >
                  <div className={classes.icon}>
                    <IconButton
                      onClick={() => handleRemoveReactive(index)}
                      style={{ padding: "10px 0px 0px 2px", color: "red" }}
                      aria-label="delete"
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleSaveReactive(index)}
                      style={{ padding: "10px 0px 0px 2px", color: "blue" }}
                      aria-label="delete"
                    >
                      <SaveIcon fontSize="large" />
                    </IconButton>
                  </div>
                  <ListItemText
                    primary={
                      <TextField
                        onChange={(e) => handleChangeQuestion(e, index)}
                        id={`question-${index}`}
                        label={`Pregunta No. ${index + 1}`}
                        style={{ margin: "0px 2px 0px 0px" }}
                        placeholder={item.question}
                        helperText="Puede Editar el campo"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                      />
                    }
                    secondary={
                      <TextField
                        onChange={(e) => handleChangeAnswer(e, index)}
                        id={`answer-${index}`}
                        label={`Respuesta No. ${index + 1}`}
                        style={{ margin: "0px 2px 0px 0px" }}
                        placeholder={item.answer}
                        helperText="Puede Editar el campo"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                      />
                    }
                  />
                </ListItem>
                {loadBar && <LinearProgress />}
                <Divider
                  className={classes.separator}
                  variant="inset"
                  component="li"
                />
              </>
            );
          })}
        </List>
      </div>
      <div className={classes.addButton}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleAddReactive()}
        >
          Agregar reactivo
        </Button>
        </div>
      <ResponsiveDialogMessage
        title="Advertencia !"
        content="Se eliminará el reactivo"
        open={open}
        handleCloseModal={onHandleCloseModal}
        handleAcceptModal={() => onHandleAcceptModal()}
      />
      <SnackBarMessage
        severity="success"
        message="Cambios Guardados"
        returnOpen={onHandleReturnOpen}
        open={openSnack}
      />
    </>
  );
};

export default SubjectEdition;

