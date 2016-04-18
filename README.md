## 前言

写了几个关于nodejs的小的demo，希望对入门有帮助！

## form_data server.js

运行命令

	node server
	
就可以看到有一个简单的form提交！


## read_changeJson 

运行命令

	node readJson  list
	
可以读取json文件中的数据！

运行命令

	node readJson  add [数据]
	
就可以向文件里面添加数据


### process 解释

#### process.argv
	
一个包含命令行参数的数组.

第一个元素会是 'node',第二个元素将是.js文件的名称.
接下来的元素依次是命令行传入的参数.

	// 要获取真正的参数元素,需要首先将数组的前两个元素去除掉
	console.log(process.argv.slice(2));

#### process.cwd()

返回进程当前的工作目录.

	console.log('Current directory: ' + process.cwd());
	
#### process.stdout

一个可写流到标准输出,即控制台输出流.

	console.log = function (d) {
		process.stdout.write(d + '\n');
	};
	process.stdin

一个标准输入的可读数据流.

标准输入流默认将暂停,所以必须调用process.stdin.resume()去从中读取.

	process.stdin.resume();
	process.stdin.setEncoding("utf8");

	process.stdin.on("data", function (chunk) {
		process.stdout.write("你录入的是:" + chunk);
	});

	process.stdin.on("end", function () {
		process.stdout.write("录入完毕.");
	});

#### process.chdir()

改变当前进程的工作目录,若操作失败则抛出异常.

	console.log('当前目录：' + process.cwd());
	try {
		process.chdir('/tmp');
		console.log('新目录：' + process.cwd());
	} catch (err) {
		console.log('chdir: ' + err);
	}


	


	