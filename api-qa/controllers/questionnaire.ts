import { Request, Response } from 'express';
import { Qa } from '../models/Questionnaire';
//const { objectMin } = require('../helper/object-with-max-value');
// const {Roles} = require('../helper/roles');

/**
 * MongoDB Database model structure
 * {
 *      "id": "5f9c3df4b77fe909bd6feb61",
 *      "code": "P551712",
 *      "category": "FILTER",
 *      "title": "FUEL-FILTER",
 *      "info": [
 *          {
 *              "trademark": "DONALDSON",
 *              "loc_qty": [
 *                  {
 *                      "location": "RACK-04-D3",
 *                      "qty": 38
 *                  }
 *              ],
 *              "costPrice": 7.036005,
 *              "salePrice": 22
 *          }
 *      ],
 *      "replacement": ["CAT: 1R0121", "OTHER: 1935274"],
 *      "measurement": "2 1/2\"",
 *      "status": "USADO"
 *  }
 */

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Path: "/"
 * Method: GET
 * Controller that gets the data for all inventory products.
 */
export const getQas = async (req: Request, res: Response) => {
  const { page, size } = req.params;
  const curPage = Number(page);
  const curSize = Number(size);
  try {
    const len = await Qa.count({});
    const result = await Qa.find({}, { id: 1, key: 1, code: 1, title: 1, details: 1, replacement: 1 })
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

/**
 *
 * @param {data} req.body
 * The information about the new product comes on body of request
 * and must have the structure of the model.
 *
 * Path: "/"
 * Method: POST
 * Controller to create a new product whose code does not exist,
 * if the code exists but not the trademark then adds the new info in that code,
 * if the trademark exists, a new loc_qty is added.
 */
export const createQa = async (req: Request, res: Response) => {
  const newQa = new Qa(req.body);
  const { code, details } = req.body;
  const { trademark, stock } = details[0];
  const { location } = stock[0];
  let savedQa;

  try {
    const productDB = await Qa.findOne({ code });

    if (productDB) {
      const trademarksAvailable = await Qa.find({ code }).distinct('details.trademark');

      if (trademarksAvailable.includes(trademark)) {
        savedQa = await Qa.updateOne(
          { code },
          {
            $push: {
              'details.$[det].stock': stock,
            },
          },
          {
            arrayFilters: [{ 'det.trademark': trademark }],
          }
        );

        res.status(201).json({
          ok: true,
          msg: `Created the new location ${location} of the product with code: ${code}`,
          result: savedQa,
        });
      } else {
        savedQa = await Qa.updateOne(
          { code },
          {
            $push: {
              details: details,
            },
          }
        );

        res.status(201).json({
          ok: true,
          msg: `The product's ${trademark} trademark was created in the code: ${code}`,
          result: savedQa,
        });
      }
    } else {
      savedQa = await newQa.save();

      res.status(201).json({
        ok: true,
        msg: 'Qa created',
        result: savedQa,
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Path: "/:id"
 * Method: GET
 * controller that updates all or part of the information of a spare part.
 */
export const updateQa = async (req: Request, res: Response) => {
  try {
    const curQa = await Qa.findById(req.params.id);

    if (!curQa) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${req.params.id}`,
      });
    }

    const newData = {
      ...req.body,
    };

    const updatedQa = await Qa.findByIdAndUpdate(req.params.id, newData, { new: true });

    res.status(200).json({
      ok: true,
      msg: 'Updated product',
      result: updatedQa,
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const updateQtyQa = async (req: Request, res: Response) => {
  try {
    const { code, trademark, location, qty } = req.body;
    const curQa = await Qa.findOne({
      code,
      'details.trademark': trademark,
    });

    if (!curQa) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with code: ${code}`,
      });
    }

    const updatedQty = await Qa.updateOne(
      { code },
      { $inc: { 'details.$[det].stock.$[loc].qty': qty } },
      {
        arrayFilters: [{ 'det.trademark': trademark }, { 'loc.location': location }],
      }
    );

    res.status(201).json({
      ok: true,
      msg: 'Updated product quantity',
      result: updatedQty,
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const deleteQa = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const curQa = await Qa.findById(id);

    if (!curQa) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${id}`,
      });
    }

    await Qa.findByIdAndDelete(id);

    res.status(201).json({
      // '/123456'
      ok: true,
      msg: 'product removed',
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const getQaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const curQa = await Qa.findById(id);

    if (!curQa) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${id}`,
      });
    }

    res.status(200).json({
      // '/123456'
      ok: true,
      msg: 'Qa got by id',
      result: curQa,
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const getQaByCode = async (req: Request, res: Response) => {
  const code = req.params.code.toUpperCase();

  try {
    const curQa = await Qa.find({ code });

    if (curQa.length < 1) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${code}`,
        result: {},
      });
    }

    //if (curQa[0] === 'undefined') curQa[0] = {};

    res.status(201).json({
      // '/123456'
      ok: true,
      msg: 'Qa got by code',
      result: curQa[0],
    });
  } catch (error) {
    msgError(res, error);
  }
};

export const getQasByCodeRegex = async (req: Request, res: Response) => {
  const code = req.params.code.toUpperCase();

  try {
    const curQa = await Qa.find(
      { code: { $regex: `^${code}` }, 'details.stock.qty': { $gt: 0 } },
      { _id: 1, code: 1, title: 1 }
    ).sort({ code: 1 });

    if (!curQa) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with code: ${code}`,
      });
    }

    res.status(200).json({
      ok: true,
      msg: 'Qa got by code regex',
      result: curQa,
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
