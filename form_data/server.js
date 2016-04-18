const http =require("http");
var items =[];
const port=3000;
const hostname="127.0.0.1";

const show =(res)=>{
	var html =`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head>
	<body>
 	<h1>TOdo List</h1><ul>
 	${
 		items.map((item)=>{return `<li>${item}</li>`}).join("")
 	}
 	</ul><form method="post" action="/">
	<p><input type="text" name="item"></p>
	<p><input type="submit" value="add Item"></p>
	</form></body></html>
	`;
	res.setHeader("Content-Type","text/html");
	res.setHeader("Content-Length",Buffer.byteLength(html));
	res.end(html);
}

const notFound=(res)=>{
	res.statusCode=404;
	res.setHeader("Content-Type","text/plain");
	res.end("no found");
}

const badRequest=(res)=>{
	res.statusCode=400;
	res.setHeader("Content-Type","text/plain");
	res.end("Bad Request");
}

const qs = require("querystring");
const add =(req,res)=>{
	var body ="";
	req.setEncoding("utf8");
	req.on("data",(chunk)=>{body+=chunk});
	req.on("end",()=>{
		var obj=qs.parse(body);
		items.push(obj.item);
		show(res);
	})
}
var server =http.createServer((req,res) =>{
	if("/" == req.url){
		switch (req.method){
			case "GET":
			show(res);
			break;
			case "POST":
			add(req,res);
			break;
			default:
			badRequest(res);
		}
	}else{
		notFound(res)
	}
});

server.listen(port,hostname,()=>{
	console.log(`hello,welcome to nodejs,you are already at http://${hostname}:${port}/`)
});