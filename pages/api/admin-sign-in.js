const db = require('../../scripts/db').instance;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1mb',
		},
	},
}

export default async function userHandler(req, res) {
	const {
		body: {name, password},
		method,
	} = req;

	switch (method) {
		case 'POST':
			let user = await db.admins.findOne({name});

			if (!user) { // Временная регистрация
				const hash = await bcrypt.hash(password, 10)
				const {insertedId} = await db.admins.insert({name, hash})
				user = await db.admins.findOne({_id: insertedId});
			}

			const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET || "lol");

			res.status(200).json({token, user: {...user, hash: undefined}})
			break
		case 'PUT':
			// Update or create data in your database
			//res.status(200).json({ id, name: name || `User ${id}` })
			break
		default:
			res.setHeader('Allow', ['POST', 'PUT'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}