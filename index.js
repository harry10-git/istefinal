const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var cacheService = require("express-api-cache");
var cache = cacheService.cache;

const path=require("path")

const app = express();
const port = 8000;
const url =
	"mongodb+srv://ISTE:manipalchapteriste@cluster0.dnubiux.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json({ extended: false }));
app.use(cors());

//CONNECT API TO FRONTEND
app.use(express.static(path.join(__dirname,"Client/build")))

//Will directly take it to website
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'Client/build', 'index.html'));
  });
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
try {
	con.on("open", () => {
		console.log("Database Connected");
	});
} catch (err) {
	console.log(err);
}

// app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:8000/',
//       changeOrigin: true,
//     })
// )


const adminrouter = require("./Routes/Admin");
app.use("/admin", adminrouter);

const boardRouter = require("./Routes/Manual/Board");
app.use("/api/board", boardRouter);

const eventRouter = require("./Routes/Manual/Event");
app.use("/api/event", eventRouter);

const acumenRouter = require("./Routes/Manual/Acumen");
app.use("/api/acumen", acumenRouter);

const TimerRouter = require("./Routes/Manual/Timer");
app.use("/api/timer", TimerRouter);

const emailRouter = require("./Routes/Manual/Email");
app.use("/api/email", emailRouter);

const MCWCRouter = require("./Routes/Manual/MCWC");
app.use("/api/MCWC", MCWCRouter);

app.get("*", (req, res) => {
	//send back index.html file
	res.sendFile(path.join(__dirname, "client/build/index.html"));
});
app.listen(process.env.PORT || 8000, () => {
	console.log("Listening to port " + port);
});
