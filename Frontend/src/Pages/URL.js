var SERVER_URL  = ""
if (process.env.NODE_ENV === "production")
	SERVER_URL = "";
else	
	SERVER_URL = "http://127.0.0.1:8000";
export default SERVER_URL;