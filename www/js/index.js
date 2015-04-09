var app = {
    db:null,
    version:'1.0';
    initialize: function() {
        this.bindEvents();
    },
    
wrapper: document.querySelector('.wrapper'),
mc: null,
modal:null,
addListeners: function(){
mc = new Hammer(wrapper, {});

var singleTap = new Hammer.Tap({ event: 'singletap' });
var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });

mc.add([doubleTap, singleTap]);
doubleTap.recognizeWith(singleTap);
    
document.addEventListener("DOMContentLoaded", function(){

        checkDB();
        updateListPeople();
        updateListOcc();
        updateListGiftsPeople();
        updateListGiftsOcc():
        
});

    
function checkDB(){
		app.db = openDatabase('Giftr', '', 'Sample DB', 1024*1024);
    
        app.db.changeVersion('', app.version,
                             
        function(trans){
            
                output("DB version incremented");
            
                var createPeople = 'CREATE TABLE people(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name TEXT)';
				var createOccasions = 'CREATE TABLE occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name TEXT)';
				var createGifts = 'CREATE TABLE gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, occ_id INTEGER, gift_idea TEXT, purchased INTEGER)';
                
                var insertZach = "INSERT INTO people(person_name) VALUES ('Zachary')";
                var insertMom = "INSERT INTO people(person_name) VALUES ('Mom')";
                var insertNanny = "INSERT INTO people(person_name) VALUES ('Nanny')";
                var insertAnne = "INSERT INTO people(person_name) VALUES ('Anne')";
                
        // Fetch the list of gifts and occasions for a specific person
                var fetchList = 'SELECT g.purchased, g.gift_id, g.idea, o.occ_name FROM gifts AS g INNER JOIN occasions AS o ON o.occ_id = g.occ_id WHERE g.person_id = ? ORDER BY o.occ_name, g.idea';
                             
            
        trans.executeSql(createPeople, [], 
            function(tx, rs){
                output("People Table Created");
                            },
            function(tx, err){
                output( err.message);
                            });
									
        trans.executeSql(createOccasions, [], 
            function(tx, rs){
                output("Occasions Table Created");
                            },
            function(tx, err){
                output( err.message);
                            });
									
        trans.executeSql(createGifts, [], 
            function(tx, rs){
                output("Gifts Table Created");
                            },
            function(tx, err){
                output( err.message);
                            });
            
        trans.executeSql(insertZach, [],
            function(tx, rs){
              output("Added row in people");
                        },
            function(tx, err){
              output( err.message);
                      });
                     },
        trans.executeSql(insertMom, [],
            function(tx, rs){
                output("Added row in people");
                            },
            function(tx, err){
                output( err.message);
                            });
                             },
                             
        trans.executeSql(insertNanny, [],
            function(tx, rs){
                output("Added row in people");
                            },
            function(tx, err){
                output( err.message);
                            });
                             },
                             
        trans.executeSql(insertAnne, [],
            function(tx, rs){
                output("Added row in people");
                            },
            function(tx, err){
                output( err.message);
                            });
                             },
                             
                             
        function(err){
                             
                output( "Change version call error " + err.message);
                        },
                             
        function(){
  
          		output("Change version function worked.")
                        });
    
}},
    
    
var target = ev.target.parentElement.id;
    
function addItem(){
        
        if (target === "people-list"){
            
            var item = document.getElementById("new-per-occ").value;
            addPerson();
            
        } else if (target == "occasion-list"){
            
            var item = document.getElementById("new-per-occ").value;
            addOcc();
            
        } else if (target == "gifts-for-person"){
            
            var idea = document.getElementById("new-idea").value;
            var item = document.getElementById("list-per-occ").value;
            addGiftPerson();
            
        } else if (target == "gifts-for-occasion"){
            
            var idea = document.getElementById("new-idea").value;
            var item = document.getElementById("list-per-occ").value;
            addGiftOcc();
        }
        
        cancelModalOverlay();
};

    function addPerson(){
        
        db.transaction(function(trans){
                       
                       trans.executeSql('INSERT INTO people(person_name) VALUES (?)', [textCatch],
                                        function(tx, rs){
                                        //do something if it works
                                        console.info("Person Added");
                                        //update the list view
                                        showPplList();
                                        },
                                        function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                        });
                       
                       });
        
    };
    
    function addOccasion(){
        
        db.transaction(function(trans){
                       
                       trans.executeSql('INSERT INTO occasions(occ_name) VALUES (?)', [textCatch],
                                        function(tx, rs){
                                        //do something if it works
                                        console.info("Occasion Added");
                                        //update the list view
                                        showOccList();
                                        },
                                        function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                        });
                       
                       });
        
    };
    
    function addGiftPerson(){
        
        console.log(liCatch);
        
        
        db.transaction(function(trans){
                       
                       trans.executeSql('INSERT INTO gifts(person_id, occ_id, gift_idea) VALUES (?, ?, ?)', [liCatch, optCatch, textCatch],
                                        function(tx, rs){
                                        //do something if it works
                                        console.info("Gift for person Added");
                                        //reshow the list
                                        showPersonGifts();
                                        
                                        },
                                        function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                        });
                       
                       });
        
    };
    
    function addGiftOccasion(){
        
        console.log(optCatch, liCatch, textCatch);
        
        db.transaction(function(trans){
                       
                       trans.executeSql('INSERT INTO gifts(person_id, occ_id, gift_idea) VALUES (?, ?, ?)', [optCatch, liCatch, textCatch],
                                        function(tx, rs){
                                        //do something if it works
                                        console.info("Gift for occasion Added");
                                        //reshow the list
                                        showOccGifts();
                                        },
                                        function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                        });
                       
                       });
        
    };
    
function removePerson(ev){
   var item = ev.target.getAttribute("data-person");
   app.db.transaction(function(trans){
          trans.executeSql('DELETE FROM people WHERE person_id =?',[item]
                    function(tx, rs){
                     //do something if it works, as desired
                     },
                     function(tx, err){
                     //failed to run query
                     });
           item.addEventListener('doubletap', removePerson, false);
           item.parentNode.removeChild(item);
},
                           
function removeOccasion(ev){
    var item = ev.target.getAttribute("data-occ");
    app.db.transaction(function(trans){
           trans.executeSql('DELETE FROM occasions WHERE occ_id =?',[item]
                      function(tx, rs){
                      //do something if it works, as desired
                      },
                      function(tx, err){
                      //failed to run query
                      });
           item.addEventListener('doubletap', removePerson, false);
           item.parentNode.removeChild(item);
},
                                              
                                              
function removeGiftPerson(ev){
    var item = ev.target.getAttribute("data-gifts-people");
    app.db.transaction(function(trans){
           trans.executeSql('UPDATE gifts SET purchased= 1 WHERE gift_id=?', [item]);
                      function(tx, rs){
                      //do something if it works, as desired
                      },
                      function(tx, err){
                      //failed to run query
                      });
            item.addEventListener('doubletap', removeGiftPerson, false);
},
                                              
                                              
function removeGiftOcc(ev){
    var item = ev.target.getAttribute("data-gifts-occ");
    app.db.transaction(function(trans){
           trans.executeSql('UPDATE gifts SET purchased= 1 WHERE occ_id =?',[item]
                      function(tx, rs){
                      //do something if it works, as desired
                      },
                      function(tx, err){
                      //failed to run query
                      });
           item.addEventListener('doubletap', removeGiftOcc, false);
},

function updateListPeople(){
  var list = document.getElementById("listview-people");
  list.innerHTML = "";

    app.db.transaction(function(trans){
      trans.executeSql("SELECT * FROM people", [],
    	  function(tx, rs){

      	  var numStuff = rs.rows.length;
      	  for(var i=0; i<numStuff; i++){
            var li = document.createElement("li");
            li.innerHTML = rs.rows.item(i).person_name;
            li.setAttribute("data-person", rs.rows.item(i).person_id);
            list.appendChild(li);
        }
       // output("displayed the current contents of the stuff table")
    	}, 
      function(tx, err){
     // 	output("transaction to list contents of stuff failed")
    });
});

function updateListOcc(){
    var list = document.getElementById("listview-occ");
    list.innerHTML = "";
        
        app.db.transaction(function(trans){
            trans.executeSql("SELECT * FROM occasions", [],
                function(tx, rs){
                                            
            var numStuff = rs.rows.length;
            for(var i=0; i<numStuff; i++){
            var li = document.createElement("li");
            li.innerHTML = rs.rows.item(i).occ_name;
            li.setAttribute("data-occ", rs.rows.item(i).occ_id);
            list.appendChild(li);
            }
            //    output("displayed the current contents of the stuff table")
            },
        function(tx, err){
           // 	output("transaction to list contents of stuff failed")
            });
});
        
function updateListGiftsPeople(){
    var list = document.getElementById("listview-gifts-people");
    list.innerHTML = "";
            
        app.db.transaction(function(trans){
            trans.executeSql("SELECT * FROM people, gifts", [],
                function(tx, rs){
                                                
                    var numStuff = rs.rows.length;
                    for(var i=0; i<numStuff; i++){
                    var li = document.createElement("li");
                    li.innerHTML = rs.rows.item(i).gift_idea + rs.rows.item(i).occ_name;
                    li.setAttribute("data-gifts-people", rs.rows.item(i).gift_id);
                    list.appendChild(li);
                    }
                    //  output("displayed the current contents of the stuff table")
                    },
                    function(tx, err){
                    // 	output("transaction to list contents of stuff failed")
                    });
});

function updateListGiftsOcc(){
    var list = document.getElementById("listview-gifts-occ");
    list.innerHTML = "";
        
    app.db.transaction(function(trans){
        trans.executeSql("SELECT * FROM people, occasions, gifts", [],
            function(tx, rs){
                                            
                var numStuff = rs.rows.length;
                for(var i=0; i<numStuff; i++){
                var li = document.createElement("li");
                li.innerHTML = rs.rows.item(i).gift_idea + rs.rows.item(i).person_name;
                li.setAttribute("data-gifts-occ", rs.rows.item(i).gift_id);
                list.appendChild(li);
                }
            //    output("displayed the current contents of the stuff table")
                },
            function(tx, err){
            // 	output("transaction to list contents of stuff failed")
                });
});
                       
function cancelGifts(ev){

   target = ev.target.parentElement.id;
                       
      if (target === "gifts-for-person"){
                       
          peopleList.className = 'active';
          occList.className = '';
          giftListO.className = '';
          giftListP.className = '';
                       
      } else if (target == "gifts-for-occasion"){
                       
          peopleList.className = '';
          occList.className = 'active';
          giftListO.className = '';
          giftListP.className = '';
                       
};
                   
var btnAdd = document.getElementsByClassName("btnAdd");
    for (a=0;a<btnAdd.length;a++){
        var mc = new Hammer(btnAdd[a]);
        mc.on('singletap', showModal);
},
                   
var btnSave = document.getElementsByClassName("btnSave");
    for (s=0;s<btnSave.length;s++){
        var mc = new Hammer(btnSave[s]);
        mc.on('singletap', addItem);
},

var btnCancel = document.getElementsByClassName("btnCancel");
    for (c=0;c<btnCancel.length;c++){
        var mc = new Hammer(btnCancel[c]);
        mc.on('singletap', cancelModalOverlay);
},
                   
var doneBtn = document.getElementsByClassName("done");
    for (d=0;d<doneBtn.length;d++){
        var mc = new Hammer(doneBtn[d]);
        mc.on('singletap', cancelGifts);
},

cancelModalOverlay: function () {
    document.querySelector("[data-role=overlay]").style.display="none";
    document.getElementById("addPerson-Occ").style.display="none";
    document.getElementById("addGift").style.display="none";
},
                                                                                                   
                   
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();