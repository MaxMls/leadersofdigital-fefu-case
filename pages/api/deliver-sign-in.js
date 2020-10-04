import {setCookie, signIn} from "../../scripts/backend";

const db = require('../../scripts/db').instance;


export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1mb',
		},
	},
}

export default async (req, res) => {
	const {
		body: {name, password},
		method,
	} = req;

	switch (method) {
		case 'POST':
			const [token, user] = await signIn('delivers', name, password)

			setCookie(res, 'token', token)

			res.status(200).json({user: {name: user.name}})
			break
		default:
			res.setHeader('Allow', ['POST'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}