chrome.runtime.sendMessage({msg: "getExEnabled"}, function(response) {
	if (response.exEnabled) {
	   var s = document.createElement('script');
		s.src = chrome.extension.getURL('submitInject.js');
		s.onload = function() {
			this.remove();
		};
		(document.head || document.documentElement).appendChild(s);
	}
});
