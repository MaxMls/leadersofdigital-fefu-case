import {defineUser, isAdmin} from "../../scripts/backend";

const db = require('../../scripts/db').instance;


export default async function stores(req, res) {
	let {
		body: {name, image, _id},
		method,
	} = req;


	const stores_attr = [
		{
			name: 'name',
			value: 'Название',
			changeable: true
		},
		{
			name: 'image',
			value: 'Картинка',
			changeable: true
		}
	]

	const model = await defineUser(req)

	switch (method) {
		case 'POST':
			if (!isAdmin(model)) return res.status(400)
			const set = {name}
			//if (image) set.image = await db.uploadFile(image)
			if (image) set.image = (image)

			if (_id) {
				await db.stores.update({_id}, {$set: set})
			} else {
				await db.stores.insert(set)
			}

			res.status(200).json({status: 'ok'})
			break
		case 'GET':
			const stores = await db.stores.find()

			res.status(200).json({stores, stores_attr})
			break
		case 'DELETE':
			if (!isAdmin(model)) return res.status(400)
			await db.stores.remove({_id})

			res.status(200).json({status: 'ok'})
			break
	}


}
