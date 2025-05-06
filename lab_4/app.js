const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const expressLayouts = require("express-ejs-layouts");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const tripRoutes = require("./routes/tripRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const userService = require("./services/userService");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayouts);
app.set("layout", "./layouts/layout");

// Session
app.use(
	session({
		secret: "supersecretkey",
		resave: false,
		saveUninitialized: false,
	})
);

// Passport strategy
passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		async (email, password, done) => {
			try {
				const user = await userService.getUserByEmail(email);
				if (!user)
					return done(null, false, { message: "Невірна пошта" });
				const match = await bcrypt.compare(password, user.password);
				if (!match)
					return done(null, false, { message: "Невірний пароль" });
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.ID);
});
passport.deserializeUser(async (id, done) => {
	try {
		const user = await userService.getUserById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.title = "Tripshare";
	res.locals.user = req.user || null;
	res.locals.isAuthenticated = req.isAuthenticated ? req.isAuthenticated() : false;
	next();
});


// Routes
app.use("/", tripRoutes);
app.use("/users", userRoutes);
app.use("/", authRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;