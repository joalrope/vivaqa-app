import { types } from '../types/types';

const initialState = {
  quizzes: [],
  activequiz: null,
};

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.quizzesLoaded:
      return {
        ...state,
        quizzes: [...action.payload],
      };

    case types.quizClearQuizzesLoaded:
      return {
        ...state,
        quizs: [],
      };

    case types.quizSetActive:
      return {
        ...state,
        activequiz: {
          ...action.payload,
        },
      };

    case types.quizClearActive:
      return {
        ...state,
        activequiz: null,
      };

    default:
      return state;
  }
};
