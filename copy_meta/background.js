/*
	Example link:
	https://books.google.com/ngrams/graph?content=a%2Cb%2Cc&year_start=1800&year_end=2000&corpus=15&smoothing=3&share=&direct_url=t1%3B%2Ca%3B%2Cc0%3B.t1%3B%2Cb%3B%2Cc0%3B.t1%3B%2Cc%3B%2Cc0
	
	Note - case INsensitivity is either "on" or absent:
	https://books.google.com/ngrams/graph?content=a%2Cb%2Cc&case_insensitive=on&year_start=1800&year_end=2000&corpus=15&smoothing=3&share=&direct_url=t4%3B%2Ca%3B%2Cc0%3B%2Cs0%3B%3Ba%3B%2Cc0%3B%3BA%3B%2Cc0%3B.t4%3B%2Cb%3B%2Cc0%3B%2Cs0%3B%3BB%3B%2Cc0%3B%3Bb%3B%2Cc0%3B.t4%3B%2Cc%3B%2Cc0%3B%2Cs0%3B%3BC%3B%2Cc0%3B%3Bc%3B%2Cc0
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