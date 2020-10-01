import { db } from '../../src/constants/apiRules';

const dataInicial = {
  allAssignatures: [],
  subject: [],
  dictionary: []
}

const GET_ALL_ASSIGNATURES = 'GET_ALL_ASSIGNATURES';
const GET_SUBJECT = 'GET_SUBJECT';
const GET_DICTIONARY = 'GET_DICTIONARY';
const ADD_REACTIVE = 'ADD_REACTIVE';
const REMOVE_REACTIVE = 'REMOVE_REACTIVE';

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
    default:
      return state
  }
}

export const getAllAssignaturesAction = () => async (dispatch, getState) => {
  try {
    const res = await db.collection('subjects').doc('nameSubjects').get();  
    dispatch({
      type: GET_ALL_ASSIGNATURES,
      payload: Object.values(res.data())
    })
  } catch(e) {
    console.log(e);
  }
}

export const getAssignatureAction = (url) => async (dispatch, getState) => {
  try {
    const res = await db.collection('quiz').doc(url).get();  
    dispatch({
      type: GET_SUBJECT,
      payload: Object.values(res.data())[0]
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

