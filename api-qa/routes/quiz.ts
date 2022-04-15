import { Router } from "express";
import { check } from "express-validator";
import { fieldsValidator } from "../middlewares/fields-validator";
import { jwtValidator } from "../middlewares/jwt-validator";
import {
	getQuizzes,
	getQuizByCode,
	getQuizById,
	createQuiz,
	updateQuiz,
	deleteQuiz,
} from "../controllers/quiz";

export const quizRouter = Router();

quizRouter.use(jwtValidator);

quizRouter.get("/code/:code", getQuizByCode);

quizRouter.get("/", getQuizzes);

quizRouter.get("/page/:page/size/:size", getQuizzes);

quizRouter.post(
	"/",
	[
		check("code").exists().withMessage("El Codigo es Obligatorio"),
		check("title").exists().withMessage("El Titulo es Obligatorio"),
		fieldsValidator,
	],
	createQuiz
);

quizRouter.get("/:id", getQuizById);

quizRouter.put("/:id", updateQuiz);

quizRouter.delete("/:id", deleteQuiz);
