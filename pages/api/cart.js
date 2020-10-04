import {setCookie, signIn} from "../../scripts/backend";

const db = require('../../scripts/db').instance;



export default async function userHandler(req, res) {
	const {
		body: {name, password},
		method,
	} = req;

	switch (method) {

		case 'GET':


			res.status(200).json({status: 'ok'})
			break
		case 'PUT':


			res.status(200).json({status: 'ok'})
			break
		case 'POST':
			//const [token, user] = await signIn(db.admins, name, password)

			//setCookie(res, 'token', token)
			res.status(200).json({status: 'ok'})
			break
		default:
			res.setHeader('Allow', ['POST'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
