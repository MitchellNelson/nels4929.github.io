var init = function(){
	var news_item_1="../JSON/news.JSON";
	var p1 = request(news_item_1);
	p1.then(results=>{
		for(var i =0; i<results.length; i++){
			//DATE
			var date_para = document.createElement("p");
			var date_t = document.createTextNode(results[i].date);
			date_para.className="dates";
			date_para.appendChild(date_t);

			//TITLE
			var title_h3 = document.createElement("h4");
			var title_t = document.createTextNode(results[i].title);
			title_h3.appendChild(title_t);

			//CONTENT
			var content_para = document.createElement("p");
			var content_t = document.createTextNode(results[i].content);
			content_para.className="description";
			content_para.appendChild(content_t);


			if(i%2==0){//makes a new row every other iteration
				var tr = document.createElement("tr");//creates new row
			}
			
			var td= document.createElement("td");//creates new column
			td.appendChild(date_para);
			td.appendChild(title_h3);
			td.appendChild(content_para);

			tr.appendChild(td);
			document.getElementById("news_table").appendChild(tr);	
		}
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
	});
	return p;
}

var initProjects = function(){
	var projects="../JSON/projects.JSON";
	var p1 = request(projects);
	p1.then(results=>{
		for(var i =0; i<results.length; i++){
			//DATE
			var date_para = document.createElement("p");
			var date_t = document.createTextNode(results[i].date);
			date_para.className="dates";
			date_para.appendChild(date_t);

			//TITLE
			var title_h3 = document.createElement("h4");
			var title_t = document.createTextNode(results[i].title);
			title_h3.appendChild(title_t);

			//TYPE
			var type_para = document.createElement("p");
			var type_t = document.createTextNode(results[i].type);
			type_para.className="type";
			type_para.appendChild(type_t);

			//TECH
			var tech_para = document.createElement("p");
			var tech_t = document.createTextNode(results[i].tech);
			tech_para.className="tech";
			tech_para.appendChild(tech_t);

			//Thumbnail
			var thumbnail = new Image();
			thumbnail.src = results[i].thumbnail;
			thumbnail.className="thumbnail";

			//DESCRIPTION
			var description_para = document.createElement("p");
			var description_t = document.createTextNode(results[i].description);
			description_para.className="description";
			description_para.appendChild(description_t);

			if(i%2==0){//makes a new row every other iteration
				var tr = document.createElement("tr");//creates new row
			}
			
			var td= document.createElement("td");//creates new column
			td.appendChild(date_para);
			td.appendChild(title_h3);
			td.appendChild(type_para);
			td.appendChild(tech_para);
			td.appendChild(thumbnail);
			
			td.appendChild(description_para);

			tr.appendChild(td);
			document.getElementById("project_table").appendChild(tr);	
		}

		var left = document.getElementById("left");
		left.addEventListener('click', function(){

			var all_slideshows = document.getElementsByClassName("pop_img");
			for(var j = 0; j<all_slideshows.length; j++){
				if(all_slideshows[j].style.display=="block"){
					var slideshow_id = all_slideshows[j].className.split(" ");
					var curr_slideshow = document.getElementsByClassName(slideshow_id[0]);
				}
			}
			
			curr_slideshow[curr_slide ].style.display="none";
			curr_slide =(curr_slide + (curr_slideshow.length-1)) % curr_slideshow.length;
			curr_slideshow[curr_slide ].style.display="block";
			document.getElementById("slide_num").innerHTML=curr_slide+1 +"/"+curr_slideshow.length;
		});

		var right = document.getElementById("right");
		right.addEventListener('click', function(){

			var all_slideshows = document.getElementsByClassName("pop_img");
			for(var j = 0; j<all_slideshows.length; j++){
				if(all_slideshows[j].style.display=="block"){
					var slideshow_id = all_slideshows[j].className.split(" ");
					var curr_slideshow = document.getElementsByClassName(slideshow_id[0]);
				}
			}
			curr_slideshow[curr_slide].style.display="none";
			curr_slide = (curr_slide+1)%curr_slideshow.length;
			curr_slideshow[curr_slide].style.display="block";
			document.getElementById("slide_num").innerHTML=curr_slide+1 +"/"+curr_slideshow.length;
		});

		var x = document.getElementById("close");
		x.addEventListener('click', function(){
			//LOOP THROUGH ALL POP_IMG AND CHANGE DISPLAY TO NONE
			for(var j = 0; j<document.getElementsByClassName("pop_img").length; j++){
				document.getElementsByClassName("pop_img")[j].style.display="none";
			}
			document.getElementById("img_background").style.display="none";
			curr_slide=0;
		});

		for(var i =0; i<results.length; i++){
			
			//LOOP OVER ALL "images" IN JSON. Every slideshow can have any number of elements		
			var image_loop = results[i].hasOwnProperty("image1");
			var image_num =1;
			while(image_loop){
				//DESCRIPTION
				var image = image = new Image();
				image.className = "img"+i;
				image.className += " pop_img";
				var image_string ="image"+image_num;
				image.src = results[i][image_string];
				//var image_t = document.createTextNode(results[i][image_string]);
				img_background.appendChild(image);
				image_num++;
				image_loop = results[i].hasOwnProperty("image"+image_num);
			}			
		}

		//loop through thumbnails and add event listeners to each
		var allThumbs = document.querySelectorAll(".thumbnail");
		allThumbs.forEach(function(img,index) {
		  img.addEventListener('click', function() {
		    showImg(index);
		 });
		});
	});	
}

var curr_slide =0;

var showImg=function(index) {
	var id = "img"+index;
	document.getElementById("img_background").style.display="block";
	var curr_slideshow = document.getElementsByClassName(id);
	curr_slideshow[0].style.display="block";
	document.getElementById("slide_num").innerHTML=curr_slide+1 +"/"+curr_slideshow.length;
}