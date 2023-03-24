const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;
const cors = require("cors");
const Auth = require("./Router/Auth/auth0");
app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);
app.all("*", (req, res, next) => {
	console.log(req.method, req.url);
	next();
});
app.use("/api/auth", Auth);
// app.post("/api/auth/signin", (req, res) => {
// 	console.log(req.body);
// 	res.send("Hello World!");
// });
// app.post("/api/auth/signup", (req, res) => {
// 	console.log(req.body);
// 	res.send("Hello World!");
// });
// app.use("/api", Auth);
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
