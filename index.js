const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");
const app = express();
const PORT = process.env.PORT || 5000;

// 告诉passport使用哪个特定provider来验证user
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientIdD,
			clientSecret: keys.googleClientSecret,
			// 在用户同意permission后,用户将要被导向的url
			callbackURL: "/auth/google/callback",
		},
		(accessToken) => {
			console.log("access token: ");
			console.log(accessToken);
		}
	)
);
app.get(
	"/auth/google",
	// 告诉passport当有人想用"google"authenticate时使用上面的strategy，
	// 上面strategy内部也定义了identifier"google"辨别使用哪个strategy
	passport.authenticate("google", {
		// 要求Google给予用户哪些方面的information
		scope: ["profile", "email"],
	})
);

// 不同在于这个route所接受的url包含了重要的code,使得passport在处理它时与上面不同
app.get("/auth/google/callback", passport.authenticate("google"));

app.listen(PORT, () => {
	console.log("server start on PORT", port);
});
