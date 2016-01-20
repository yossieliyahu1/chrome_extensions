

// #[ct_msg_to_bg]   -- search for content script message to the background page
// #[ct_msg_to_ui]   -- search for content script message to the ui page
// use "chrome.runtime.onMessage.addListener" to receive message from both

// message from the background page and popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

	if (request.name == "msgfrombackgroundpage") {
    	switch (request.type){
    		case "type1": 
    			console.log("[content script] - receive message from background page - type1");
    			/* do something */
    			break;
    		case "type2": 
    			console.log("[content script] - receive message from background page - type2");
    			/* do something */
    			break;
    	}
    }

    if (request.name == "msgfromuipage") {
    	switch (request.type){
    		case "type1": 
    			console.log("[content script] - receive message from ui page - type1");
    			/* do something */
    			break;
    		case "type2": 
    			console.log("[content script] - receive message from ui page - type2");
    			/* do something */
    			break;
    	}
    }

});

// what can we do with a content script 
// ======================================


// 1. manipulate the DOM

(function (){

	console.log("[content script] - loaded");
	var d_ = document.createElement("div");
	d_.setAttribute("style", "width:40px;height:30px;border:1px solid black;background-color:red;position:absolute;left:0px;top:100px;");
	d_.innerText = "2 BG";
	d_.onclick = function () {
		// message to the background page and popup
		console.log("[content script] - sending message to the background page - type1");

		// #[ct_msg_to_bg], // #[ct_msg_to_ui] 
		chrome.runtime.sendMessage({ "name": "msgfromcontentscript", "type": "type1" });
		chrome.runtime.sendMessage({ "name": "msgfromcontentscript", "type": "type2" });
	};

	document.body.appendChild(d_);

})();

