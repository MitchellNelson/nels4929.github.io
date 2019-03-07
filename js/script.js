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
	['Finnish',	'fi'],['Chinese',	'zh'],	
	['French',	'fr'],
	['Korean',	'ko'],	
	['Hindi',	'hi'],
	['Xhosa',	'xh'],	
	['Croatian'	,'hr'],
	['Khmer'	,'km'],	
	['Czech'	,'cs'],
	['Laotian',	'lo'],	
	['Swedish',	'sv'],
	['Latin',	'la'],	
	['Scottish',	'gd'],
	['Latvian'	,'lv'],	
	['Estonian'	,'et'],
	['Lithuanian',	'lt'],	
	['Esperanto',	'eo'],
	['Luxembourgish',	'lb'],	
	['Javanese',	'jv'],
	['Malagasy',	'mg'],	
	['Japanese',	'ja'],
	['Malay','ms']];

	langs.forEach(function(element) {
  		var btn = document.createElement("button");
  		btn.id=element[1];
  		btn.innerHTML=element[0];

  		//call translate when clicked with appropriate lang code
  		btn.addEventListener('click', function() {
			translate_text(element[1]);
		});
  		document.getElementsByClassName("dropdown-content")[0].appendChild(btn);
	});
}
	
var translate_text = function(lang){
	var body = document.getElementsByTagName('body');
	for(var i = 0; i<body[0].childNodes.length; i++){
		console.log(body[0].childNodes[i]);

	}


	var text = document.getElementById("intro_p").innerHTML;
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
		document.getElementById("intro_p").innerHTML = results.text[0];
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
			//DATE
			var date_para = document.createElement("p");
			var date_t = document.createTextNode(results[i].date_begin);
			date_para.appendChild(date_t);



			//TITLE
			var title_h3 = document.createElement("h4");
			var title_t = document.createTextNode(results[i].title);
			title_h3.appendChild(title_t);

			//DESCRIPTION
			var description_para = document.createElement("p");
			var description_t = document.createTextNode(results[i].item1);
			description_para.appendChild(description_t);

			
			var tr = document.createElement("tr");//creates new row
			
			
			var td= document.createElement("td");//creates new column
			td.appendChild(title_h3);
			td.appendChild(date_para);
			td.appendChild(description_para);

			var date_td= document.createElement("td");//creates new column
			date_td.appendChild(date_para);

			tr.appendChild(date_td);
			tr.appendChild(td);
			
			document.getElementById("education_table").appendChild(tr);
			
		}
		
	});	
	var experience="../JSON/experience.JSON";
	var p1 = request(experience);
	p1.then(results=>{
		console.log(results);
		for(var i =0; i<results.length; i++){
			//DATE
			var date_para = document.createElement("p");
			var date_t = document.createTextNode(results[i].date_begin);
			date_para.appendChild(date_t);



			//TITLE
			var title_h3 = document.createElement("h4");
			var title_t = document.createTextNode(results[i].title);
			title_h3.appendChild(title_t);

			//DESCRIPTION
			var item1_para = document.createElement("p");
			var item1_t = document.createTextNode(results[i].item1);
			item1_para.appendChild(item1_t);

			var item2_para = document.createElement("p");
			var item2_t = document.createTextNode(results[i].item2);
			item2_para.appendChild(item2_t);

			var item3_para = document.createElement("p");
			var item3_t = document.createTextNode(results[i].item3);
			item3_para.appendChild(item3_t);

			var item4_para = document.createElement("p");
			var item4_t = document.createTextNode(results[i].item4);
			item4_para.appendChild(item4_t);

			var tr = document.createElement("tr");//creates new row
			
			var td= document.createElement("td");//creates new column
			td.appendChild(title_h3);
			td.appendChild(date_para);
			td.appendChild(item1_para);
			td.appendChild(item2_para);
			td.appendChild(item3_para);
			td.appendChild(item4_para);

			var date_td= document.createElement("td");//creates new column
			date_td.appendChild(date_para);

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
			//TITLE
			var title_h3 = document.createElement("h4");
			var title_t = document.createTextNode(results[i].title);
			title_h3.appendChild(title_t);

			//DATE
			var date_para = document.createElement("p");
			var date_t = document.createTextNode(results[i].date);
			date_para.appendChild(date_t);

			//Thumbnail
			var thumbnail = new Image();
			thumbnail.src = results[i].thumbnail;
			thumbnail.className="thumbnail";
			
			//IMG
			var image = new Image();
			image.className = "pop_img";

			//DESCRIPTION
			var description_para = document.createElement("p");
			var description_t = document.createTextNode(results[i].description);
			description_para.appendChild(description_t);

			if(i%2==0){//makes a new row every other iteration
				var tr = document.createElement("tr");//creates new row
			}
			
			var td= document.createElement("td");//creates new column
			td.appendChild(title_h3);
			td.appendChild(date_para);
			td.appendChild(thumbnail);
			td.appendChild(image);
			td.appendChild(description_para);

			tr.appendChild(td);
			document.getElementById("project_table").appendChild(tr);
		}
			var allThumbs = document.querySelectorAll(".thumbnail");
			console.log(allThumbs.length);
			allThumbs.forEach(function(img, index) {
			  img.addEventListener('click', function() {
			    showImg(index);
			 });
			});
	});	


}

var showImg=function(thumbnail) {
	console.log(thumbnail);
}