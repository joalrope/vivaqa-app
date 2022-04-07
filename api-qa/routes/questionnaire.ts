const router = require('express').Router();
import { check } from 'express-validator';
import { fieldsValidator } from '../middlewares/fields-validator';
import { jwtValidator } from '../middlewares/jwt-validator';
import { getQas, getQaByCode, getQaById, createQa, updateQa, deleteQa } from '../controllers/questionnaire';
/*
    Rutas de Qaos (qas routes)
    host + api/qas
*/

//Obtener un Qaos cuya expresion regular coincida con Code
router.get('/code/:code', getQaByCode);

//Todas las rutas deben pasar por la Validacion del Token
router.use(jwtValidator);

//Obtener productos
router.get('/', getQas);

//Obtener pagina de productos
router.get('/page/:page/size/:size', getQas);

//Crear un nuevo producto
router.post(
  '/',
  [
    check('code').exists().withMessage('El Codigo es Obligatorio'),
    check('title').exists().withMessage('El Titulo es Obligatorio'),
    fieldsValidator,
  ],
  createQa
);

//Obtener un Qao mediante Id
router.get('/:id', getQaById);

//Actualizar informacion de un Qao
router.put('/:id', updateQa);

//Eliminar un Qao
router.delete('/:id', deleteQa);

module.exports = router;
