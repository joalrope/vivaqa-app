import { Request, Response } from 'express';
import { Quiz } from '../models/Quiz';

export const getQuizzes = async (req: Request, res: Response) => {
  const { page, size } = req.params;
  const curPage = Number(page);
  const curSize = Number(size);
  try {
    const len = await Quiz.count({});
    const result = await Quiz.find({}, { id: 1, key: 1, code: 1, title: 1, details: 1, replacement: 1 })
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

export const createQuiz = async (req: Request, res: Response) => {
  const newQuiz = new Quiz(req.body);
  const { code } = req.body;
  let savednewQuiz;

  try {
    const quizDB = await Quiz.findOne({ code });

    if (!quizDB) {
      savednewQuiz = await newQuiz.save();

      res.status(201).json({
        ok: true,
        msg: 'Quiz created',
        result: savednewQuiz,
      });
    } else {
      res.status(201).json({
        ok: false,
        msg: `A quiz already exists with code ${code}`,
        result: [],
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const curQuiz = await Quiz.findById(req.params.id);

    if (!curQuiz) {
      return res.status(404).json({
        ok: false,
        msg: `There is not product with id: ${req.params.id}`,
      });
    }

    const newData = {
      ...req.body,
    };

    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, newData, { new: true });

    res.status(200).json({
      ok: true,
      msg: 'Updated quiz',
      result: updatedQuiz,
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const curQuiz = await Quiz.findById(id);

    if (!curQuiz) {
      return res.status(404).json({
        ok: false,
        msg: `There is no quiz with id: ${id}`,
      });
    }

    await Quiz.findByIdAndDelete(id);

    res.status(201).json({
      ok: true,
      msg: 'quiz removed',
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const curQuiz = await Quiz.findById(id);

    if (!curQuiz) {
      return res.status(404).json({
        ok: false,
        msg: `There is no quiz with id: ${id}`,
      });
    }

    res.status(200).json({
      ok: true,
      msg: 'Quiz got by id',
      result: curQuiz,
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const getQuizByCode = async (req: Request, res: Response) => {
  const code = req.params.code.toUpperCase();

  try {
    const curQuiz = await Quiz.find({ code });

    if (curQuiz.length < 1) {
      return res.status(404).json({
        ok: false,
        msg: `There is not Quiz with id: ${code}`,
        result: {},
      });
    }

    res.status(201).json({
      ok: true,
      msg: 'Quiz got by code',
      result: curQuiz[0],
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
