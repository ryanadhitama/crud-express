const s = require('superstruct');
const service = require('../services/book');
const qs = require('../libs/qs');
const paginate = require('../libs/paginate');
const { exception } = require('../libs/error');
const { validate } = require('../libs/validate');

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *      - Books
 *     description: Get books list
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *        - in: query
 *          name: page_size
 *          schema:
 *            type: number
 *        - in: query
 *          name: sort_by
 *          schema:
 *            type: string
 *            enum: [created_at, updated_at, title, description]
 *        - in: query
 *          name: sort_direction
 *          schema:
 *            type: string
 *            enum: [ASC, DESC]
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *     responses:
 *        200:
 *          description: Success operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Book'
 *                  meta:
 *                    $ref: '#/components/schemas/Meta'
 *        400:
 *          $ref: '#/components/responses/InvalidPayload'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 */
const index = async (req, res, next) => {
  try {
    const filter = qs(req);
    const data = await service.search({ ...req.query, ...filter });
    return res.status(200).json({
      success: true,
      data: data.rows,
      ...paginate(req, data.count)
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

/**
 * @openapi
 * /books:
 *   post:
 *     tags:
 *      - Books
 *     description: Save new book
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *     responses:
 *        201:
 *          description: Success operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  data:
 *                    $ref: '#/components/schemas/Book'
 *        400:
 *          $ref: '#/components/responses/InvalidPayload'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 */
const store = async (req, res, next) => {
  const schema = {
    title: s.nonempty(s.string()),
    description: s.optional(s.string())
  };

  const errors = validate(req.body, schema);
  if (errors) {
    return res.status(400).json({
      success: false,
      message: errors
    });
  }

  try {
    const data = await service.store(req.body);
    return res.status(201).json({
      success: true,
      data: data
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags:
 *      - Books
 *     description: Get book by ID
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *     responses:
 *        200:
 *          description: Success operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  data:
 *                    $ref: '#/components/schemas/Book'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 */
const find = async (req, res, next) => {
  try {
    const data = await service.find(req.params.id);
    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

/**
 * @openapi
 * /books/{id}:
 *   patch:
 *     tags:
 *      - Books
 *     description: Update book by ID
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *     responses:
 *        200:
 *          description: Success operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  data:
 *                    $ref: '#/components/schemas/Book'
 *        400:
 *          $ref: '#/components/responses/InvalidPayload'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 */
const update = async (req, res, next) => {
  const schema = {
    title: s.nonempty(s.string()),
    description: s.optional(s.string())
  };

  const errors = validate(req.body, schema);
  if (errors) {
    return res.status(400).json({
      success: false,
      message: errors
    });
  }

  try {
    await service.find(req.params.id);
    await service.update({ id: req.params.id }, req.body);
    const data = await service.find(req.params.id);

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     tags:
 *      - Books
 *     description: Delete book by ID
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *     responses:
 *        200:
 *          description: Success operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  message:
 *                    type: string
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 */
const destroy = async (req, res, next) => {
  try {
    await service.find(req.params.id);
    await service.destroy({
      id: req.params.id
    });
    return res.status(200).json({
      success: true,
      message: 'Success delete'
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

module.exports = {
  index,
  store,
  find,
  update,
  destroy
};
