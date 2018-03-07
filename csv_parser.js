const csv = require("csvtojson");
const firebase = require('firebase');
const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var config = {
	apiKey: "AIzaSyDxDEQrrrT2C2-0k4dCjDHF1vzbeVqdsFw",
	authDomain: "cs2340project-76d43.firebaseapp.com",
	databaseURL: "https://cs2340project-76d43.firebaseio.com/",
	storageBucket: "cs2340project-76d43.appspot.com",
};

var app = firebase.initializeApp(config);
var db = firebase.database();

rl.question('What file would you like parsed? ', (answer) => {
	parseCSV(answer)
	rl.close();
});

function parseCSV(filename) {
	fs.lstat(filename, (err, stats) => {
	    if(err) {
	        return console.log(err);
	    }
		csv().fromFile(filename)
			.on("end_parsed", function(jsonArrayObj){ //when parse finished, result will be emitted here.
				console.log(jsonArrayObj);
				for (var i = 0; i < jsonArrayObj.length; i++) {
					console.log(jsonArrayObj[i]);
					db.ref('Shelters/' + jsonArrayObj[i].Key).push(jsonArrayObj[i]).catch((error) => {
						return console.log(error);
					});
					console.log("Done");
				}
	 	});
	});
}