
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
        $(this).css("background-color", "grey");
          $(this).css("cursor", "pointer");
        });


});
