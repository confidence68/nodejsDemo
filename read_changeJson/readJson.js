var fs = require("fs");
var path = require("path");
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join(" ");
var file = path.join(process.cwd(), "/file.json");



const loadOrInitializeTaskArray = (file, cb) => {
	console.log(file)
	fs.exists(file, (exists) => {
		var tasks = [];
		if (exists) {
			fs.readFile(file, "utf8", (err, data) => {
				if (err) throw err;
				var data = data.toString();
				var tasks = JSON.parse(data || "[]");
				console.log(tasks);
				cb(tasks)
			})
		} else {
			cb([]);
		}
	})
}

const listTasks = (file) => {
	loadOrInitializeTaskArray(file, (tasks) => {
		for (var i in tasks) {
			console.log(tasks[i])
		}
	})
}

const storeTasks = (file, tasks) => {
	fs.writeFile(file, JSON.stringify(tasks), "utf8", (err) => {
		if (err) throw err;
		console.log("Saved.")
	})
}

const addTask = (file, taskDescription) => {
	loadOrInitializeTaskArray(file, (tasks) => {
		if(tasks instanceof Array){
			tasks.push(taskDescription);
		}else{
			tasks["newDate"]=taskDescription;
		}
		
		storeTasks(file, tasks);
	})
}

switch (command) {
	case "list":
		listTasks(file);
		break;
	case "add":
		addTask(file, taskDescription);
		break;
	default:
		console.log(`Usage:${process.argv[0]} list|add [taskDescription]`);
}