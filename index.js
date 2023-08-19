/// Importing Packages 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var cacheService = require("express-api-cache");
var cache = cacheService.cache;
const path=require("path")

/// Initialising the Backend Service
const app = express();

///MONGODB URL SETUP.
const url =
	"mongodb+srv://ISTE:manipalchapteriste@cluster0.dnubiux.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json({ extended: false }));
app.use(cors());

//CONNECT API TO FRONTEND
app.use(express.static(path.join(__dirname,"Client/build")))

///MONGOOSE CONNECTION TO THE BACKEND
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
try {
	con.on("open", () => {
		console.log("Database Connected");
	});
} catch (err) {
	console.log(err);
}

/// SETTING UP API ROUTES AND ADMIN PORTAL

/// ADMIN PAGE
const adminrouter = require("./Routes/Admin");
app.use("/admin", adminrouter);

///BOARD INFO ROUTE
const boardRouter = require("./Routes/Manual/Board");
app.use("/api/board", boardRouter);

///EVENT INFO ROUTE
const eventRouter = require("./Routes/Manual/Event");
app.use("/api/event", eventRouter);

///ACUMEN INFO ROUTE
const acumenRouter = require("./Routes/Manual/Acumen");
app.use("/api/acumen", acumenRouter);

///EVENT TIMER COUNTDOWN ROUTE
const TimerRouter = require("./Routes/Manual/Timer");
app.use("/api/timer", TimerRouter);

///FORM BACKEND ROUTE
const emailRouter = require("./Routes/Manual/Email");
app.use("/api/email", emailRouter);

///MC-WC INFORMATION ROUTE
const MCWCRouter = require("./Routes/Manual/MCWC");
app.use("/members/api/MCWC", MCWCRouter);

///THESE ALL ROUTES ARE SETUP IN ORDER TO AVOID WEBSITE CRASHING AND CLASHING OF FRONTEND&BACKEND ROUTE

app.get("/", (req, res) => {
	//send back index.html file
	res.sendFile(path.join(__dirname, "Client/build/index.html"));
});
app.get("/events", (req, res) => {
	//send back index.html file
	res.sendFile(path.join(__dirname, "Client/build/index.html"));
});
app.get("/acumen", (req, res) => {
	//send back index.html file
	res.sendFile(path.join(__dirname, "Client/build/index.html"));
});
app.get("/members", (req, res) => {
	//send back index.html file
	res.sendFile(path.join(__dirname, "Client/build/index.html"));
});

app.get("/members/mc", (req, res) => {
	//send back index.html file
	res.sendFile(path.join(__dirname, "Client/build/index.html"));
});

app.get("/members/wc", (req, res) => {
	//send back index.html file
	res.sendFile(path.join(__dirname, "Client/build/index.html"));
});

//LISTEN TO PORT
app.listen(process.env.PORT || 8000, () => {
	console.log("Listening to port " );
});
