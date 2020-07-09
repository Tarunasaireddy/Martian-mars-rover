
// This is for creating grid

function createGrid(x) {
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $("#container").append("<div class='grid'></div>");
        };
    };
    $(".grid").width(960/x);
    $(".grid").height(960/x);
};



// we will decide grid size accordingly
// this is for manuplating things as required for our project.
$(document).ready(function() {
    createGrid(16);

     $(".grid").mouseover(function() {
         //$(this).css("background-color", "grey");
          $(this).css("cursor", "pointer");
         });
    var a=[],bt=[];
    var y="";
    var b=document.querySelectorAll('.b');
    var a=document.querySelectorAll('.grid');
    b.forEach(function(button,index){
      button.addEventListener('click',function(){
        console.log("button clicked");
        if(index==0)
        {
          y="green";
        }
        else if (index==1) {
          y="grey";
        }
        else if (index==2) {
          y="violet";
        }
        else if (index==3) {
          y="red";
        }
        else{
          y="";
        }

      });
    });
    a.forEach(function(button,index){
      button.addEventListener('click',function(){
        console.log("clicked");
        a[index].style.background=y;

      });
    });

});
