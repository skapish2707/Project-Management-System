if (process.env.NODE_ENV === "production")
	var SERVER_URL = "https://project-management-system-ark.herokuapp.com:"+process.env.PORT;
else	
	var SERVER_URL = "";
console.log(process.env.NODE_ENV);
export default SERVER_URL;
