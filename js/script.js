var init = function(){
	var news_item_1="../JSON/news.JSON";
	var p1 = request(news_item_1);
	p1.then(results=>{
		console.log(results);

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
	//document.getElementById("translate").onclick = function() {translate()};
	initTranslate();
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

var translateRequest = function(filename){
	var p = new Promise((resolve,reject)=>{
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			console.log("req.status: " + req.status);
			if (req.readyState == 4 && req.status == 200){
				//sucessfully recieved data!
				var data =JSON.parse(req.response);
				//console.log(data);
	   			resolve(data);
			}
			else if(req.readyState == 4 &&req.status == 400  && !failed_yandex_request){
				alert("Error: Invalid request.")
				reject("Error: " + req.status);
				failed_yandex_request =1;
			}
			else if(req.readyState == 4 &&req.status == 401  && !failed_yandex_request){
				alert("Error: Authorization data was not specified in the request.")
				reject("Error: " + req.status);
				failed_yandex_request =1;
			}
			else if(req.readyState == 4 &&req.status == 403  && !failed_yandex_request){
				alert("Error: Invalid authorization data specified in the request, or access to the requested resource is forbidden.")
				reject("Error: " + req.status);
				failed_yandex_request =1;
			}
			else if(req.readyState == 4 &&req.status == 404  && !failed_yandex_request){
				alert("Error: The requested resource was not found.")
				reject("Error: " + req.status);
				failed_yandex_request =1;
			}
			else if(req.readyState == 4 &&req.status == 405  && !failed_yandex_request){
				alert("Error: The requested method is not supported for the specified resource.")
				reject("Error: " + req.status);
				failed_yandex_request =1;
			}
			else if(req.readyState == 4 &&req.status == 415  && !failed_yandex_request){
				alert("Error: The method does not support the requested content type.")
				reject("Error: " + req.status);
				failed_yandex_request =1;
			}
			else if(req.readyState == 4 &&req.status == 420  && !failed_yandex_request){
				alert("Error: Exceeded limits on access to the resource.")
				reject("Error: " + req.status);
				failed_yandex_request =1;
			}
			else if(req.readyState == 4 &&req.status == 500  && !failed_yandex_request){
				alert("Error: Internal server error. Try calling the method again later. If the error persists, contact the Yandex.Market support service.")
				reject("Error: " + req.status);
				failed_yandex_request =1;
			}
			else if(req.readyState == 4 &&req.status == 503  && !failed_yandex_request){
				alert("Error: The server is temporarily unavailable due to high loads. Try calling the method again later.")
				reject("Error: " + req.status);
				failed_yandex_request =1;
			}
		};
		req.open("GET", filename,true);
		req.send();
		console.log(req);
	});
	return p;
}

var initTranslate = function(){
	var langs = [['Azerbaijan','az'],['Malayalam',	'ml'],['Albanian',	'sq'],	['Maltese',	'mt'],['Amharic',	'am'],	['Macedonian',	'mk'],['English',	'en'],	['Maori',	'mi'],['Arabic',	'ar'],	['Marathi',	'mr'],
	['Armenian',	'hy'],	['Mari',	'mhr'],['Afrikaans',	'af'],	['Mongolian',	'mn'],['Basque',	'eu'],	['German',	'de'],['Bashkir',	'ba'],	['Nepali',	'ne'],
	['Belarusian',	'be'],	['Norwegian',	'no'],['Bengali',	'bn'],	['Punjabi',	'pa'],['Burmese',	'my'],	['Papiamento',	'pap'],['Bulgarian',	'bg'],	['Persian',	'fa'],
	['Bosnian',	'bs'],	['Polish',	'pl'],['Welsh',	'cy'],	['Portuguese',	'pt'],['Hungarian',	'hu'],	['Romanian',	'ro'],['Vietnamese',	'vi'],	['Russian',	'ru'],['Haitian (Creole)',	'ht'],	
	['Cebuano',	'ceb'],['Galician',	'gl'],	['Serbian',	'sr'],['Dutch',	'nl'],	['Sinhala',	'si'],['Hill Mari',	'mrj'],	['Slovakian',	'sk'],['Greek',	'el'],	['Slovenian',	'sl'],
	['Georgian',	'ka'],['Swahili',	'sw'],['Gujarati',	'gu'],	['Sundanese',	'su'],['Danish',	'da'],	['Tajik',	'tg'],['Hebrew',	'he'],	['Thai',	'th'],['Yiddish',	'yi'],	
	['Tagalog',	'tl'],['Indonesian',	'id'],	['Tamil',	'ta'],['Irish',	'ga'],	['Tatar',	'tt'],['Italian',	'it'],	['Telugu',	'te'],['Icelandic',	'is'],	['Turkish',	'tr'],
	['Spanish',	'es'],	['Udmurt',	'udm'],['Kazakh',	'kk'],	['Uzbek',	'uz'],['Kannada',	'kn'],	['Ukrainian',	'uk'],['Catalan',	'ca'],	['Urdu',	'ur'],['Kyrgyz',	'ky'],	
	['Finnish',	'fi'],['Chinese',	'zh'],	['French',	'fr'],['Korean',	'ko'],	['Hindi',	'hi'],['Xhosa',	'xh'],	['Croatian'	,'hr'],['Khmer'	,'km'],	['Czech'	,'cs'],
	['Laotian',	'lo'],	['Swedish',	'sv'],['Latin',	'la'],	['Scottish',	'gd'],['Latvian'	,'lv'],	['Estonian'	,'et'],['Lithuanian',	'lt'],	['Esperanto',	'eo'],['Luxembourgish',	'lb'],	
	['Javanese',	'jv'],['Malagasy',	'mg'],	['Japanese',	'ja'],['Malay','ms']];

	langs.forEach(function(element) {
  		var btn = document.createElement("button");
  		btn.id=element[1];
  		btn.innerHTML=element[0];

  		//call translate when clicked with appropriate lang code
  		btn.addEventListener('click', function() {
			getAll(element[1], document.body);
		});
  		document.getElementsByClassName("dropdown-content")[0].appendChild(btn);
	});
	
}
var failed_yandex_request=0;
//recursively go through all content from body 
function getAll (lang, element) {
    for (var i = 0; i < element.childNodes.length; i++) {
      var child = element.childNodes[i];
      getAll(lang, child);
      //if child is at the bottom 
    	if(child.children != undefined && !child.children.length > 0){
	      	console.log(child.innerHTML);
	      	if(!child.innerHTML=="" && child.innerHTML!="&gt;" && child.innerHTML!="&lt;"){
	      		translate_text(lang, child)
	      	}
    	} 
    }
}

var translate_text = function(lang, element){
	var body = document.getElementsByTagName('body');
	for(var i = 0; i<body[0].childNodes.length; i++){
		console.log(body[0].childNodes[i]);
	}

	var text = element.innerHTML;
	console.log(text);
	 var address2 = "https://translate.yandex.net/api/v1.5/tr.json/getLangs";
	 address2 += "?key=trnsl.1.1.20190307T013627Z.6d9185c2da4f0c66.d25b4224007eb3e063e2316975cd030d29b967e1";
	 address2+="&en";

	var address = "https://translate.yandex.net/api/v1.5/tr.json/translate";
	address+= "?key=trnsl.1.1.20190307T013627Z.6d9185c2da4f0c66.d25b4224007eb3e063e2316975cd030d29b967e1";//api key
	address+="&lang="+lang;
	address+="&text="+ text;

	var p1 = translateRequest(address);
	p1.then(results=>{
		element.innerHTML = results.text[0];
	});
}

var initResume = function(){
	var education="../JSON/education.JSON";

	var p1 = request(education);
	p1.then(results=>{
		console.log(results);


		for(var i =0; i<results.length; i++){
			//begin date
			var date_para = document.createElement("p");
			var date_t = document.createTextNode(results[i].date_begin);
			date_para.appendChild(date_t);

			//end date
			var edate_para = document.createElement("p");
			var edate_t = document.createTextNode(results[i].date_end);
			edate_para.appendChild(edate_t);

			//TITLE
			var title_h3 = document.createElement("h4");
			var title_a = document.createElement("a");
			title_a.href=results[i].title_link;
			title_a.target="_blank";

			console.log(title_a);
			var title_t = document.createTextNode(results[i].title);
			title_h3.appendChild(title_a);
			title_a.appendChild(title_t);


			//DESCRIPTION
			var gpa_para = document.createElement("p");
			var gpa_t = document.createTextNode(results[i].gpa);
			gpa_para.appendChild(gpa_t);

			var honors_para = document.createElement("p");
			var honors_t = document.createTextNode(results[i].honors);
			honors_para.appendChild(honors_t);

			var grad_para = document.createElement("p");
			var grad_t = document.createTextNode(results[i].graduation);
			grad_para.appendChild(grad_t);

			var tr = document.createElement("tr");//creates new row
			
			var td= document.createElement("td");//creates new column
			td.appendChild(title_h3);
			td.appendChild(date_para);
			td.appendChild(edate_para);
			td.appendChild(gpa_para);
			td.appendChild(honors_para);
			td.appendChild(grad_para);

			var date_td= document.createElement("td");//creates new date column
			date_td.className="dates";
			date_td.appendChild(date_para);
			date_td.appendChild(edate_para);

			tr.appendChild(date_td);
			tr.appendChild(td);
			document.getElementById("education_table").appendChild(tr);
		}
		initTranslate();
	});	
	var experience="../JSON/experience.JSON";
	var p1 = request(experience);
	p1.then(results=>{
		console.log(results);
		for(var i =0; i<results.length; i++){
			//begin date
			var date_para = document.createElement("p");
			var date_t = document.createTextNode(results[i].date_begin);
			date_para.appendChild(date_t);

			//end date
			var edate_para = document.createElement("p");
			var edate_t = document.createTextNode(results[i].date_end);
			edate_para.appendChild(edate_t);

			//TITLE
			var title_h3 = document.createElement("h4");
			var title_t = document.createTextNode(results[i].title);
			title_h3.appendChild(title_t);

			var tr = document.createElement("tr");//creates new row
			
			var td= document.createElement("td");//creates new column
			td.appendChild(title_h3);
			td.appendChild(date_para);
			td.appendChild(edate_para);
			
			//LOOP OVER ALL "ITEMS" IN JSON. RESUME CAN HAVE ANY NUMBER OF "BULLET POINTED" ITEMS		
			var item_loop = results[i].hasOwnProperty("item1");
			var item_num =1;
			while(item_loop){
				
				//DESCRIPTION
				var item_para = document.createElement("p");
				var item_string ="item"+item_num;

				var item_t = document.createTextNode(results[i][item_string]);
				console.log(item_t);
				item_para.appendChild(item_t);
				td.appendChild(item_para);
				item_num++;
				item_loop = results[i].hasOwnProperty("item"+item_num);
			}			
			var date_td= document.createElement("td");//creates new column
			date_td.className="dates";
			date_td.appendChild(date_para);
			date_td.appendChild(edate_para);

			tr.appendChild(date_td);
			tr.appendChild(td);
			
			document.getElementById("experience_table").appendChild(tr);
		}
	});

		var skills="../JSON/skills.JSON";
	var p1 = request(skills);
	p1.then(results=>{
		console.log(results);

		for(var i =0; i<results.length; i++){
			//left
			var left_para = document.createElement("p");
			var left_t = document.createTextNode(results[i].left);
			left_para.appendChild(left_t);

			//content
			var content_para = document.createElement("p");
			var content_t = document.createTextNode(results[i].content);
			content_para.appendChild(content_t);

			var tr = document.createElement("tr");//creates new row
			var left_td= document.createElement("td");//creates new column
			var td= document.createElement("td");//creates new column

			left_td.className="dates";
			left_td.appendChild(left_para);
			td.appendChild(content_para);

			tr.appendChild(left_td);
			tr.appendChild(td);
			
			document.getElementById("skills_table").appendChild(tr);
		}
	});			
}

var initProjects = function(){
	var projects="../JSON/projects.JSON";
	var p1 = request(projects);
	p1.then(results=>{
		console.log(results);
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
			console.log("left");

			var all_slideshows = document.getElementsByClassName("pop_img");
			for(var j = 0; j<all_slideshows.length; j++){
				if(all_slideshows[j].style.display=="block"){
					var slideshow_id = all_slideshows[j].className.split(" ");
					var curr_slideshow = document.getElementsByClassName(slideshow_id[0]);
				}
			}
			
			curr_slideshow[curr_slide ].style.display="none";
			console.log("length: " + curr_slide);
			curr_slide =(curr_slide + (curr_slideshow.length-1)) % curr_slideshow.length;
			console.log("length: " + curr_slide);
			curr_slideshow[curr_slide ].style.display="block";
			document.getElementById("slide_num").innerHTML=curr_slide+1 +"/"+curr_slideshow.length;
		});

		var right = document.getElementById("right");
		right.addEventListener('click', function(){
			console.log("right");

			var all_slideshows = document.getElementsByClassName("pop_img");
			for(var j = 0; j<all_slideshows.length; j++){
				if(all_slideshows[j].style.display=="block"){
					var slideshow_id = all_slideshows[j].className.split(" ");
					var curr_slideshow = document.getElementsByClassName(slideshow_id[0]);
				}
			}
			console.log("in right: " + slideshow_id + "    " + curr_slideshow[0].src);
			curr_slideshow[curr_slide].style.display="none";
			console.log("length: " + curr_slide);
			curr_slide = (curr_slide+1)%curr_slideshow.length;
			console.log("length: " + curr_slide);
			curr_slideshow[curr_slide].style.display="block";
			document.getElementById("slide_num").innerHTML=curr_slide+1 +"/"+curr_slideshow.length;
		});

		var x = document.getElementById("close");
		x.addEventListener('click', function(){
			//LOOP THROUGH ALL POP_IMG AND CHANGE DISPLAY TO NONE
			for(var j = 0; j<document.getElementsByClassName("pop_img").length; j++){
				document.getElementsByClassName("pop_img")[j].style.display="none";
			}
			//LOOP THROUGH ALL POP_DESCRIPTIONS AND CHANGE DISPLAY TO NONE
			for(var j = 0; j<document.getElementsByClassName("pop_description").length; j++){
				document.getElementsByClassName("pop_description")[j].style.display="none";
			}
			document.getElementById("img_background").style.display="none";
			curr_slide=0;
		});

		for(var i =0; i<results.length; i++){
			var img_background = document.getElementById("img_background");

			var pop_description = document.createElement("p");
			var pop_description_t = document.createTextNode(results[i].description);
			pop_description.className="pop_description";
			pop_description.id="pop_description"+i;
			pop_description.style.display="none";
			pop_description.appendChild(pop_description_t);
			img_background.appendChild(pop_description);
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
		console.log(allThumbs.length);
		allThumbs.forEach(function(img,index) {
		  img.addEventListener('click', function() {
		    showImg(index);
		 });
		});
	});	
	initTranslate();
}

var curr_slide =0;

var showImg=function(index) {
	var id = "img"+index;
	console.log(id);
	document.getElementById("img_background").style.display="block";
	document.getElementById("pop_description"+index).style.display="block";
	var curr_slideshow = document.getElementsByClassName(id);
	curr_slideshow[0].style.display="block";
	document.getElementById("slide_num").innerHTML=curr_slide+1 +"/"+curr_slideshow.length;
}

var slide=function(slide_amt){
	console.log("slide_amt: "+slide_amt);
}


