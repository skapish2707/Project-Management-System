var filestack = require('filestack-js').init(process.env.FILESTACK_API_KEY);


async function uploadFile(file){
	let url = null 

	// response = await filestack.upload(file.data)
	// url = response.url


	return url
}


function deleteFile(url){

	// filestack.remove('xlmiBJEfRpigYzgssEEE')
	// .then((res) => {
	// 	console.log(res);
	// })
	// .catch((err) => {
	// 	console.log(err);
	// });
}

module.exports = {
	uploadFile : uploadFile,
	deleteFile : deleteFile
}
