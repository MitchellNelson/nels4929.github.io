var init = function(){
	var news_item_1="../JSON/news.JSON";
	var p1 = request(news_item_1);
	p1.then(results=>{
		console.log(results);
		document.getElementById("news_item_1_title").innerHTML += results[0].title;
		document.getElementById("news_item_1_date").innerHTML += results[0].date;
		document.getElementById("news_item_1_content").innerHTML += results[0].content;
		document.getElementById("news_item_2_title").innerHTML += results[1].title;
		document.getElementById("news_item_2_date").innerHTML += results[1].date;
		document.getElementById("news_item_2_content").innerHTML += results[1].content;
	});
}

var request = function(filename){
	var p = new Promise((resolve,reject)=>{
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if (req.readyState == 4 && req.status == 200){
				//sucessfully recieved data!
				var data =JSON.parse(req.response);
				//console.log(data);
	   			resolve(data);
			}
			else if(req.readyState == 4){
				reject("Error: " + req.status);
			}
		};
		req.open("GET", filename,true);
		req.send();
		console.log(req);
	});
	return p;
}

var initResume = function(){
	var ed_item_1="../JSON/education.JSON";
	var p1 = request(ed_item_1);
	p1.then(results=>{
		console.log(results);
		document.getElementById("ed_title").innerHTML += results[0].title;
		document.getElementById("ed_item1").innerHTML += results[0][1];
		
	});
}