import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { db } from '../../src/constants/apiRules';

export const getAllAssignatures = async (collection, doc) => {
  return await db.collection(collection).doc(doc).get();
}

export const getAssignature = async (collection, doc) => {
  return await db.collection(collection).doc(doc).get();
}

export const getDictionary = async () => {
  return await db.collection('subjects').doc('nameSubjects').get();
}

export const updateAssignatures = async (collection, doc, data) => {
  db.collection(collection).doc(doc).update({...data})
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
};

export const createDocument = async (collection, doc) => {
  db.collection(collection).doc(doc).set({})
    .then(() => {
        console.log("Document successfully created!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
};

export const updateSubject = async (collection, doc, data) => {
  db.collection(collection).doc(doc).set({...data})
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
};

export const deleteAssignature = async (collection, doc) => {
  db.collection(collection).doc(doc).delete()
    .then(() => {
      console.log("Document successfully deleted!");
    }).catch(error => {
        console.error("Error removing document: ", error);
    });
};

