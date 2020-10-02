const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://leadersofdigital-fefu-case:HKpqG828g2aRF0el@cluster0.azxhj.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true});

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = (globalSymbols.indexOf(DB_KEY) > -1);

if (!hasDb) {
	client.connect(err => {
		const db = client.db("fefu-delivery")

		const stores = db.collection("stores");

		global[DB_KEY] = {stores}

		//client.close();
	});
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