///Implicate swipe for navigation

var pages = [];
var numLinks = 0;
var numPages = 0;

var wrapper = document.getElementById('wrapper');
var mc = new Hammer(wrapper);

var swipePeople = new Hammer(pplList);
swipePeople.on('swipeleft', swipePage);
var swipeOcc = new Hammer(occList);
swipePeople.on('swiperight', swipePage);

function swipePage(url){
    
    if(url == null){
        peopleList.className = 'active';
        history.replaceState(null, null, "#people-list");
    }else{
        
        if (url.target.id == "people-list"){
            peopleList.className = '';
            occList.className = 'active';
        }else{
            peopleList.className = 'active';
            occList.className = '';
        }
},

                          
function handleNav(ev){
    ev.preventDefault();
    var href = ev.target.href;
    var parts = href.split("#");
    swipePage( parts[1] );
    return false;
},
          
function handlePageShow(ev){
    ev.target.className = "active";
},

function addDispatch(num){
  pages[num].dispatchEvent(pageshow);
};
