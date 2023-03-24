const express = require("express");
const router = express.Router();
const Firebase = require("../../Firebase");

router.get("/signin", async (req, res) => {
	console.log("got sign in request: ");
	console.log(req);
});
router.post("/signup", async (req, res) => {
	let user;
	let error;
	try {
		user = await Firebase.createUser(req.body.email, req.body.password);
		res.status(201).send({ user });
	} catch (err) {
		error = err;
		res.status(400).send({ error });
	}
});

module.exports = router;
