import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const dbConnectionSatus = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//const states = mongoose.ConnectionStates;
	const status = mongoose.connection.readyState;

	if (status === 0) {
		res.status(501).json({
			ok: false,
			msg: "No hay conexión con la base de datos",
			result: {},
		});
	}
	next();
};
