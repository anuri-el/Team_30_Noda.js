var express = require("express");
var router = express.Router();

/* GET users listing. */

const students = [
	{
		id: 1,
		name: "Poteichuk Sofiia",
		group: "IA-34",
		email: "s@example.com",
		github: "https://github.com/anuri-el",
		image: "/images/aaa.jpg",
	},
	{
		id: 2,
		name: "Tunik Oleksandr",
		group: "IA-34",
		email: "o@example.com",
		github: "https://github.com/Smegalex",
		image: "/images/smeg.png",
	},
	{
		id: 3,
		name: "Shvets Roman",
		group: "IA-34",
		email: "r@example.com",
		github: "https://github.com/rshvtss",
		image: "/images/aaa.jpg",
	},
];
router.get("/:id", (req, res) => {
	const student = students.find((s) => s.id === parseInt(req.params.id));
	if (!student) {
		return res.status(404).send("Студента не знайдено");
	}
	res.render("student", { student });
});

module.exports = router;
