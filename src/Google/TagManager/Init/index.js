import TagManager from "react-gtm-module";
console.log("initializing tag manager");
TagManager.initialize({
	gtmId: process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID,
});
