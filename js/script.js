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
	
	//recursively go through all content from body 
function getAll (lang, element) {
    for (var i = 0; i < element.childNodes.length; i++) {
      var child = element.childNodes[i];
      getAll(lang, child);
      //if child is at the bottom 
    	if(child.children != undefined && !child.children.length > 0){
	      	console.log(child.innerHTML);
	      	if(!child.innerHTML==""){
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

	var p1 = request(address);
	p1.then(results=>{
		console.log(results);
		element.innerHTML = results.text[0];
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
			var title_t = document.createTextNode(results[i].title);
			title_h3.appendChild(title_t);

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

			//Thumbnail
			var thumbnail = new Image();
			thumbnail.src = results[i].thumbnail;
			thumbnail.className="thumbnail";

			//DESCRIPTION
			var description_para = document.createElement("p");
			var description_t = document.createTextNode(results[i].description);
			description_para.className="description";
			description_para.appendChild(description_t);


			if(i%3==0){//makes a new row every other iteration
				var tr = document.createElement("tr");//creates new row
			}
			
			var td= document.createElement("td");//creates new column
			td.appendChild(date_para);
			td.appendChild(title_h3);
			td.appendChild(thumbnail);
			td.appendChild(description_para);

			tr.appendChild(td);
			document.getElementById("project_table").appendChild(tr);	
		}

		//ADD ALL FULL SIZED IMAGES TO A SEPERATE DIV
		var img_div= document.createElement("div");
		img_div.id="img_background";
		//BACKGROUND FUNCTIONALITY FOR CLOSING POP UP
		img_div.addEventListener( 'click', function(){
			//LOOP THROUGH ALL POP_IMG AND CHANGE DISPLAY TO NONE
			for(var j = 0; j<document.getElementsByClassName("pop_img").length; j++){
				console.log(document.getElementsByClassName("pop_img")[j]);
				document.getElementsByClassName("pop_img")[j].style.display="none";
			}
			document.getElementById("img_background").style.display="none";
		});

		var close = document.createElement("p");
		//X FUNCTIONALITY
		close.addEventListener( 'click', function(){
			//LOOP THROUGH ALL POP_IMG AND CHANGE DISPLAY TO NONE
			for(var j = 0; j<document.getElementsByClassName("pop_img").length; j++){
				console.log(document.getElementsByClassName("pop_img")[j]);
				document.getElementsByClassName("pop_img")[j].style.display="none";
			}
			document.getElementById("img_background").style.display="none";
		});

		close.id="close";
		close_t =document.createTextNode("x");
		close.appendChild(close_t);

		img_div.appendChild(close);
		for(var i =0; i<results.length; i++){
			var image = new Image();
			image.src = results[i].image;
			image.id = "img"+i;
			image.className = "pop_img";
			img_div.appendChild(image);
			document.getElementById("project_table").appendChild(img_div);
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

var showImg=function(index) {
	var id = "img"+index;
	console.log(id);
	document.getElementById("img_background").style.display="block";
	document.getElementById(id).style.display="block";
}



