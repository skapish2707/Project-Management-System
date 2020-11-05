if (process.env.NODE_ENV === "production")
	var SERVER_URL = "";
else	
	var SERVER_URL = "http://127.0.0.1:8000";
export default SERVER_URL;