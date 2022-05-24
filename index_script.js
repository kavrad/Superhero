//Trigger function get Data on each keyup event in input
document.getElementById('hero-name').onkeyup = getData;
//hero-id
let heroId = 0;
//function to grab data from the user
function getData(){
    var val = document.getElementById('hero-name').value;
    var list = document.getElementById('auto-fill');
    clearList();
    
    var xhrRequest = new XMLHttpRequest();
    
    //handling http request
   xhrRequest.onload = function(){
       var result = JSON.parse(xhrRequest.response);

       //getting all the available data
       var name = result.results;
       if(name == null){
           clearList();
           console.log('Not Found');
       }
      else{
          for(var i of name){
              //Creating individual list item and appending it
              var li = document.createElement('li');
              li.innerText = i.name;
              li.id = i.id;
              li.classList.add('list-group-item');
              li.addEventListener('click',function(){
                  heroId = this.id;
                  document.getElementById('hero-name').value = this.innerText;
                  clearList();
                  //Brings the focus to input
                  document.getElementById('hero-name').focus();
                  return;
              });
              var ul = document.getElementById('auto-fill').appendChild(li);
          }
      }
       
   }
   //xmlRequest
   xhrRequest.open('get','https://superheroapi.com/api.php/102418315822625/search/'+val);
   xhrRequest.send();
   
   

}
//handling enter key event
document.getElementById('hero-name').addEventListener('keydown',function(ev){
    if(ev.keyCode == 13){
        if(heroId == 0){
            alert('No hero found! Try selecting the hero from the list');
        }else{
            showHero();
        }
    }
});
//function to clear the list items from list
function clearList(){
    var list = document.getElementById('auto-fill');
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }
    
}
//on clicking search button
document.getElementById('btn-search').addEventListener('click',showHero);
function showHero(){
    var name = document.getElementById('hero-name').value;
    if(name==''){
        alert('Enter the name to be searched')
    }else if(heroId==0){
        alert('Oops! no hero found! Try selecting hero from the list');
    }else{
        window.open('superhero.html?id='+heroId,'blank');
    }
   
}
// on clicking my favorite button
document.getElementById('btn-favourite').addEventListener('click',function(){
    window.location.assign('favourite.html');
})

