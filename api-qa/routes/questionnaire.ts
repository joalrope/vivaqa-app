const router = require('express').Router();
import { check } from 'express-validator';
import { fieldsValidator } from '../middlewares/fields-validator';
import { jwtValidator } from '../middlewares/jwt-validator';
import {
  getQuestionnaires,
  getQuestionnaireByCode,
  getQuestionnaireById,
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
} from '../controllers/questionnaire';

router.use(jwtValidator);

router.get('/code/:code', getQuestionnaireByCode);

router.get('/', getQuestionnaires);

router.get('/page/:page/size/:size', getQuestionnaires);

router.post(
  '/',
  [
    check('code').exists().withMessage('El Codigo es Obligatorio'),
    check('title').exists().withMessage('El Titulo es Obligatorio'),
    fieldsValidator,
  ],
  createQuestionnaire
);

router.get('/:id', getQuestionnaireById);

router.put('/:id', updateQuestionnaire);

router.delete('/:id', deleteQuestionnaire);
