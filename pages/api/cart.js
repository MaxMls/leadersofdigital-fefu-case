import {defineUser} from "../../scripts/backend";

const db = require('../../scripts/db').instance;


export default async function userHandler(req, res) {
	const {
		body,
		method,
	} = req;


	//const model = await defineUser(req);
	switch (method) {

		case 'GET':
			const orders = await db.orders.find()
			res.status(200).json({orders})

			break
		case 'PUT':
			res.status(200).json({status: 'ok'})

			break
		case 'POST':
			// auth check temporally disabled
			let set = {
				...body
			}
			set.products = []

			Object.entries(body.products).map(([_id, count]) => {
				const p = db.products.findOne({_id: db.id(_id)})
				set.products.push({...p, count})
			})

			await db.orders.insert(set)

			res.status(200).json({status: 'ok'})
			break
		default:
			res.setHeader('Allow', ['POST', 'PUT', 'GET'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
