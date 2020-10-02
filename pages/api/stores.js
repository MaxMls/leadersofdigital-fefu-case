const db = require('../../scripts/db').instance;


export default async (req, res) => {
	res.statusCode = 200

	const stores = await db.stores.find().toArray()

	res.json({stores})
}
