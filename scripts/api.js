import axios from 'axios';


let apiPath = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:3000/api/'
//const apiPath = 'https://leadersofdigital-fefu-case.vercel.app/api/'

if (typeof window === 'undefined') {
	apiPath = 'https://leadersofdigital-fefu-case.vercel.app/api/'
} else {
	let apiPath = '/api/'
}

const queryQueue = []

const apiCall = ({url, data = {}, method, headers = {}}) =>
	new Promise(async (resolve, reject) => {
		console.log('apiCall', url);

		const appendData = {};
		if (data !== undefined) appendData[method === 'get' ? 'params' : 'data'] = data;

		// console.log(apiPath)
		//headers = {'Content-Type': 'application/json', ...headers}

		try {
			console.log('Request:', appendData);
			let res = await axios({
				method: method || 'post',
				url: apiPath + url,
				timeout: 100000,
				...appendData,
				headers,
			});

			//	console.log('Result:', res);
			resolve(res);
		} catch (e) {
			// console.error(e);
			reject(e)
		}
	});

export default apiCall;

