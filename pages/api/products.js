const db = require('../../scripts/db').instance;


export default async function products(req, res) {
	let {
		body: {name, company, cost, weight, category, image, _id},
		method,
	} = req;

	let storeId = req.query.storeId || req.body.storeId


	const products_attr = [
		{
			name: 'name',
			value: 'Название',
		},
		{
			name: 'company',
			value: 'Компания',
		},
		{
			name: 'cost',
			value: 'Цена',
		},
		{
			name: 'weight',
			value: 'Вес',
		},
		{
			name: 'category',
			value: 'Категория',
		},
		{
			name: 'image',
			value: 'Картинка',
		},
	]

	switch (method) {
		case 'POST':
			const set = {name, company, cost, weight, category, storeId: db.id(storeId)}
			//if (image) set.image = await db.uploadFile(image)
			if (image) set.image = (image)

			if (_id) {
				await db.products.update({_id}, {$set: set})
			} else {
				await db.products.insert(set)
			}

			res.status(200).json({status: 'ok'})
			break
		case 'GET':
			const query = {}
			if (storeId) query.storeId = db.id(storeId)
			let products = await db.products.find(query)

			/*if (Array.isArray(products)){
				products.map((item)=>{item, })
			}*/

			res.status(200).json({products, products_attr})
			break
		case 'DELETE':
			await db.products.remove({_id})

			res.status(200).json({status: 'ok'})
			break
	}


}
