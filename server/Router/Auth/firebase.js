const express = require("express");
const router = express.Router();
const Firebase = require("../../Firebase");

router.post("/signin", async (req, res) => {
	const user = await Firebase.signInWithEmailAndPassword(
		req.body.email,
		req.body.password
	);
	res.status(200).send({ user });
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
