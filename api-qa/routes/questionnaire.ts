import { Router } from 'express';
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

export const questionnaireRouter = Router();

questionnaireRouter.use(jwtValidator);

questionnaireRouter.get('/code/:code', getQuestionnaireByCode);

questionnaireRouter.get('/', getQuestionnaires);

questionnaireRouter.get('/page/:page/size/:size', getQuestionnaires);

questionnaireRouter.post(
  '/',
  [
    check('code').exists().withMessage('El Codigo es Obligatorio'),
    check('title').exists().withMessage('El Titulo es Obligatorio'),
    fieldsValidator,
  ],
  createQuestionnaire
);

questionnaireRouter.get('/:id', getQuestionnaireById);

questionnaireRouter.put('/:id', updateQuestionnaire);

questionnaireRouter.delete('/:id', deleteQuestionnaire);
