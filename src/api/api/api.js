import React from 'react';
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
