import Joi from 'joi';

export const schemas = {
	POST_INSERT: {
		body: Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			roles: Joi.array().required(),
		}),
	},
	PUT_UPDATE: {
		body: Joi.object({
			name: Joi.string(),
			email: Joi.string().email(),
			password: Joi.string(),
			roles: Joi.array(),
		}),
		params: Joi.object({
			id: Joi.number().required(),
		}),
	},
	GET_PAGINATION: {
		params: Joi.object({
			page: Joi.number().required(),
			pageSize: Joi.number().required(),
		}),
	},
	GET_ONE: {
		params: Joi.object({
			id: Joi.number().required(),
		}),
	},
	GET_ALL: {
		query: Joi.object({
			document: Joi.string()
				.min(8)
				.max(12)
				.regex(/^[0-9]+[a-zA-Z]{2,4}$/),
			//.required(),
		}),
	},
};
