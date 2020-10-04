import {serialize} from "cookie";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../scripts/db').instance;


export const defineUser = async (req) => {
	try {
		const token = req.cookies.token;

		const userObj = jwt.verify(token, process.env.JWT_SECRET || "lol");

		const _id = db.id(userObj._id);
		req.userModel = await db[userObj.model].findOne({_id});

		return userObj.model
	} catch (e) {
		req.userModel = null;
	}

}

export async function signIn(modelName, name, password) {
	let user = await db[modelName].findOne({name});

	if (!user) { // Временная регистрация
		const hash = await bcrypt.hash(password, 10)
		const {insertedId} = await db[modelName].insert({name, hash})
		user = await db[modelName].findOne({_id: insertedId});
	}

	const token = jwt.sign({_id: user._id, model: modelName}, process.env.JWT_SECRET || "lol");

	return [token, user]
}

export const setCookie = (res, name, value, options) => {
	const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

	if (!!options && 'maxAge' in options) {
		options.expires = new Date(Date.now() + options.maxAge)
		options.maxAge /= 1000
	}

	res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}


export const isAdmin = (model) => model === 'admins'

