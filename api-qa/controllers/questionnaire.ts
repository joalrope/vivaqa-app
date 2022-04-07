import { Request, Response } from 'express';
import { Questionnaire } from '../models/Questionnaire';

export const getQuestionnaires = async (req: Request, res: Response) => {
  const { page, size } = req.params;
  const curPage = Number(page);
  const curSize = Number(size);
  try {
    const len = await Questionnaire.count({});
    const result = await Questionnaire.find({}, { id: 1, key: 1, code: 1, title: 1, details: 1, replacement: 1 })
      .sort('code')
      .limit(curSize)
      .skip((curPage - 1) * curSize);

    res.status(200).json({
      ok: true,
      msg: 'Get products',
      result: { len, result },
    });
  } catch (error) {
    msgError(req, error);
  }
};

export const createQuestionnaire = async (req: Request, res: Response) => {
  const newQuestionnaire = new Questionnaire(req.body);
  const { code } = req.body;
  let savednewQuestionnaire;

  try {
    const QuestionnaireDB = await Questionnaire.findOne({ code });

    if (!QuestionnaireDB) {
      savednewQuestionnaire = await newQuestionnaire.save();

      res.status(201).json({
        ok: true,
        msg: 'Questionnaire created',
        result: savednewQuestionnaire,
      });
    } else {
      res.status(201).json({
        ok: false,
        msg: 'El cuestionario ya existe',
        result: [],
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

export const updateQuestionnaire = async (req: Request, res: Response) => {
  try {
    const curQuestionnaire = await Questionnaire.findById(req.params.id);

    if (!curQuestionnaire) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${req.params.id}`,
      });
    }

    const newData = {
      ...req.body,
    };

    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(req.params.id, newData, { new: true });

    res.status(200).json({
      ok: true,
      msg: 'Updated product',
      result: updatedQuestionnaire,
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const deleteQuestionnaire = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const curQuestionnaire = await Questionnaire.findById(id);

    if (!curQuestionnaire) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${id}`,
      });
    }

    await Questionnaire.findByIdAndDelete(id);

    res.status(201).json({
      ok: true,
      msg: 'questionnaire removed',
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const getQuestionnaireById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const curQuestionnaire = await Questionnaire.findById(id);

    if (!curQuestionnaire) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${id}`,
      });
    }

    res.status(200).json({
      ok: true,
      msg: 'Questionnaire got by id',
      result: curQuestionnaire,
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const getQuestionnaireByCode = async (req: Request, res: Response) => {
  const code = req.params.code.toUpperCase();

  try {
    const curQuestionnaire = await Questionnaire.find({ code });

    if (curQuestionnaire.length < 1) {
      return res.status(404).json({
        ok: false,
        msg: `There is not Questionnaire with id: ${code}`,
        result: {},
      });
    }

    res.status(201).json({
      ok: true,
      msg: 'Questionnaire got by code',
      result: curQuestionnaire[0],
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const msgError = (res: any, err: any) => {
  console.log(err);
  res.status(500).json({
    ok: false,
    msg: 'Please, talk to the administrator',
  });
};
