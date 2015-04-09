///Implicate swipe for navigation

var pages = [];
var numLinks = 0;
var numPages = 0;

var wrapper = document.getElementById('wrapper');
var mc = new Hammer(wrapper);

//document.addEventListener("DOMContentLoaded", function(){
//    swipepages = document.getElementByClassName('swipepage');
//	numPages = swipepages.length;
//	for(var i=0;i<numPages; i++){
//        var mc = new Hammer(swipepages);
//        mc.on("swipeleft swiperight", function(ev) {
//        swipepages.textContent = ev.type;
//	}
//	loadPage(null);
//});
                          
var pageshow = document.createEvent("CustomEvent");
    pageshow.initEvent("pageShow", false, true);
                          
    document.addEventListener("DOMContentLoaded", function(){
        pages = document.querySelectorAll('#list-people, #list-occ');
        numPages = pages.length;
      for(var p=0; p < numPages; p++){
          var mc = new Hammer(pages);
          mc.on("swipeleft swiperight", function(ev) {
          pages[p].addEventListener("pageShow", handlePageShow, false);
          pages.textContent = ev.type;
        }
          loadPage(null);
        });
                          
function handleNav(ev){
    ev.preventDefault();
    var href = ev.target.href;
    var parts = href.split("#");
    loadPage( parts[1] );
    return false;
}
          
function handlePageShow(ev){
    ev.target.className = "active";
}

function loadPage( url ){
	if(url == null){
		pages[0].style.display = 'active';
		history.replaceState(null, null, "#people-list");	
	}else{
    for(var i=0; i < numPages; i++){
      pages[i].className = "hidden";
      if(pages[i].id == url){
        pages[i].className = "show";
        history.pushState(null, null, "#" + url);
        setTimeout(addDispatch, 50, i);
      }
   }
}

function addDispatch(num){
  pages[num].dispatchEvent(pageshow);
};
