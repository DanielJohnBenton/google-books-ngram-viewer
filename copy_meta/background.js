/*
	Example link:
	https://books.google.com/ngrams/graph?content=a%2Cb%2Cc&year_start=1800&year_end=2000&corpus=15&smoothing=3&share=&direct_url=t1%3B%2Ca%3B%2Cc0%3B.t1%3B%2Cb%3B%2Cc0%3B.t1%3B%2Cc%3B%2Cc0
*/
function copyTabUrl(tabUrl)
{
	// https://stackoverflow.com/a/18455088
	var copyFrom = document.createElement("textarea");
	copyFrom.textContent = tabUrl;
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(copyFrom);
	copyFrom.select();
	document.execCommand("Copy");
	body.removeChild(copyFrom);
}

// https://stackoverflow.com/a/34553860
chrome.browserAction.onClicked.addListener(
	function(tab)
	{
	   copyTabUrl(tab.url);
	}
);