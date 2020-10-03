const monk = require('monk')
const {BlobServiceClient} = require('@azure/storage-blob');
import {v4 as uuidv4} from 'uuid';

const thunkyp = require('thunky/promise')

const uri = "mongodb+srv://leadersofdigital-fefu-case:HKpqG828g2aRF0el@cluster0.azxhj.gcp.mongodb.net/fefu-delivery?retryWrites=true&w=majority";
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=startdb;AccountKey=3MJLKUC2gLs72s/ZEqFtzd6mfDj194ftwR2KKII8yvZGRwREZFNpOpzZgjfLGuCcc0QHHtZwCIoHb9fHAo62GA==;EndpointSuffix=core.windows.net"

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = (globalSymbols.indexOf(DB_KEY) > -1);


if (!hasDb) {
	const db = monk(uri);

	const users = db.get('stores')
	const admins = db.get('admins')
	const delivers = db.get('delivers')
	const stores = db.get('stores')


	const storage = thunkyp(async function () {
		console.log('Azure Blob storage v12 - JavaScript');
		const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

		const containerName = 'images';
		const containerClient = await blobServiceClient.getContainerClient(containerName);

		if (!(await containerClient.exists())) {
			await containerClient.create();
			await containerClient.setAccessPolicy('Blob');
		}

		return [containerClient, blobServiceClient]
	})


	async function uploadFile(rawData) {
		console.log(await storage())
		const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
		//const [containerClient, blobServiceClient] = await storage()
		/*
				const blobName = uuidv4();
				const blockBlobClient = containerClient.getBlockBlobClient(blobName);
				const ex = await blockBlobClient.exists();
				if (ex) {
					return;
				}
				await blockBlobClient.uploadFile(file.localPath);
				await blockBlobClient.setHTTPHeaders({
					blobContentType: "image/jpeg",
					blobCacheControl: "public"
				});
				const uri = blockBlobClient.Uri.AbsoluteUri
				console.log('uploaded:', uri)
				return uri*/

		const matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
		const type = matches[1];
		const buffer = new Buffer(matches[2], 'base64');

		const res = await blobServiceClient.createBlockBlobFromText('images', uuidv4(), buffer, {contentType: type});
		console.log(res)
	}

	global[DB_KEY] = {db, users, admins, delivers, stores, uploadFile}
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, "instance", {
	get: function () {
		return global[DB_KEY];
	}
});
Object.freeze(singleton);

module.exports = singleton;