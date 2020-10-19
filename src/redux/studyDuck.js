import { db } from '../../src/constants/apiRules';

const dataInicial = {
  allAssignatures: [],
  subject: [],
  dictionary: [],
  barLoader: false
}

const GET_ALL_ASSIGNATURES = 'GET_ALL_ASSIGNATURES';
const GET_SUBJECT = 'GET_SUBJECT';
const GET_DICTIONARY = 'GET_DICTIONARY';
const ADD_REACTIVE = 'ADD_REACTIVE';
const REMOVE_REACTIVE = 'REMOVE_REACTIVE';
const SET_BAR_LOADER = 'SET_BAR_LOADER';

export default function studyDuck(state = dataInicial, action) {
  switch(action.type) {
    case GET_ALL_ASSIGNATURES:
      return {
        ...state,
        allAssignatures: action.payload
      }
    case GET_SUBJECT:
      return {
        ...state,
        subject: action.payload
      }
    case ADD_REACTIVE:
      return {
        ...state,
        subject: [...state.subject, action.payload]
      }
    case REMOVE_REACTIVE:
      return {
        ...state,
        subject: [...state.subject.filter((item, index) => index !== action.payload)]
      }
    case SET_BAR_LOADER:
      return {
        ...state,
        barLoader: action.payload
      }
    default:
      return state
  }
}

export const getAllAssignaturesAction = () => async (dispatch, getState) => {
  try {
    db.collection("subjects").get()
      .then(querySnapshot => {
        let results = [];
          querySnapshot.forEach(doc => {
            results.push(...Object.values(doc.data()));
          });
          dispatch({
            type: GET_ALL_ASSIGNATURES,
            payload: results
          })
        console.log(results)
      });
  } catch(e) {
    console.log(e);
  }
}

export const getAssignatureAction = (url) => async (dispatch, getState) => {
  try {
    const response = await db.collection('quiz').doc(url).get();  
    console.log('exists->', response.exists);
    console.log('payload', Object.values(response.data())[0])
    const payload = response.exists ? Object.values(response.data())[0] : []; 
    dispatch({
      type: GET_SUBJECT,
      payload 
    })
  } catch(e) {
    console.log(e);
  }
}

export const addAssignatureAction = (reactive) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_REACTIVE,
      payload: reactive,
    })
  } catch(e) {
    console.log(e);
  }
}

export const removeAssignatureAction = (item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_REACTIVE,
      payload: item
    })
  } catch(e) {
    console.log(e);
  }
}

export const barLoaderAction = (status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_BAR_LOADER,
      payload: status
    })
  } catch(e) {
    console.log(e);
  }
}

