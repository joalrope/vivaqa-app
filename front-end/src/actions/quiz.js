//import { activeQuizTemplate, quizTemplate } from '../assets/data/quizzes.dataConfig';
import { fetchWithToken } from '../helpers/fetch';
//import { jsonSort } from '../helpers/json-sort';
import { types } from '../types/types';

export const getQuizzes = (page, pageSize) => {
  return async (dispatch) => {
    const { ok, result } = await dispatch(fetchWithToken(`/quizzes/page/${page}/size/${pageSize}`));

    if (ok) {
      return result;
    }
  };
};

export const findQuizByCode = (code) => {
  return async (dispatch) => {
    try {
      if (code.length > 1) {
        const { ok, result } = await dispatch(fetchWithToken(`/quizzes/regex/${code}`));
        if (ok) {
          dispatch(setQuizzesLoaded(result));
        }
      } else {
        dispatch(setQuizzesLoaded([]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getQuizByCode = async (code) => {
  return async (dispatch) => {
    try {
      const curQuiz = await dispatch(fetchWithToken(`/quizzes/code/${code}`));

      const quiz = await curQuiz;
      return quiz;
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateQuizQty = async (quiz) => {
  return async (dispatch) => {
    const { code } = quiz;
    try {
      await dispatch(fetchWithToken(`/quizzes/qty/${code}`, quiz, 'PUT'));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateQuiz = async (id, quiz) => {
  return async (dispatch) => {
    try {
      await dispatch(fetchWithToken(`/quizzes/${id}`, quiz, 'PUT'));
    } catch (error) {
      console.log(error);
    }
  };
};

export const findQuizById = (id) => {
  return async (dispatch) => {
    try {
      const { ok, result: quiz } = await dispatch(fetchWithToken(`/quizzes/${id}`));
      //const quiz = jsonSort(result, activeQuizTemplate);

      if (ok) {
        dispatch(quizSetActive(quiz));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createQuiz = (quiz) => {
  return async (dispatch) => {
    try {
      const resultQuiz = await dispatch(fetchWithToken('/quizzes', quiz, 'POST'));

      const { ok, msg, result } = resultQuiz;
      if (ok) {
        //const quiz = jsonSort(result, quizTemplate);
        const quiz = result;
        dispatch(quizSetActive(quiz));
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteQuiz = async (id) => {
  return async (dispatch) => {
    try {
      const { ok, result } = await dispatch(fetchWithToken(`/quizzes/${id}`, {}, 'DELETE'));

      if (ok) {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const quizSetActive = (quiz) => ({
  type: types.quizSetActive,
  payload: quiz,
});

export const quizClearActive = () => ({
  type: types.quizClearActivePoduct,
});

export const clearQuizzesLoaded = () => ({
  type: types.quizclearQuizzesLoaded,
});

const setQuizzesLoaded = (quizzes) => ({
  type: types.quizLoaded,
  payload: quizzes,
});
