exports.ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

exports.ensureRole = (role) => {
	return (req, res, next) => {
		if (req.session && req.session.user && req.session.user.role === role) {
			return next();
		}
		res.status(403).send("Доступ заборонено.");
	};
};
