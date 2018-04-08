chrome.runtime.sendMessage({msg: "getExEnabled"}, function(response) {
	if (response.exEnabled) {
		var eS = document.createElement('script');
		eS.src = chrome.extension.getURL('esprima.js');
		eS.onload = function() {
			this.remove();
		};
		(document.head || document.documentElement).appendChild(eS);

		var piS = document.createElement('script');
		piS.src = chrome.extension.getURL('prepareInject.js');
		piS.onload = function() {
			this.remove();
		};
		(document.head || document.documentElement).appendChild(piS);
   }
});
