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
// consider each block as a node
class Node {

  constructor(size, posx, posy, walkable, startpoints,endpoints) {
    var F;

    var parent;
    //this.a=a;
    this.inPath = false;
    this.getGCost = Infinity;
    this.getHCost = Infinity;
    this.getFCost = Infinity;
    this.parent_i=-1;
    this.parent_j=-1;
    this.size = size;
    this.posx = posx;
    this.posy = posy;
    //this.walkable = walkable;
    this.occupied=false;
    this.startpoints=startpoints;
    this.endpoints=endpoints;

  }

  createStartNode(a,index) {

      a[index].style.background="green";

    }
  createEndNode(a,index) {

      a[index].style.background="red";

  }
  toggleWalkable() {
    this.walkable = !this.walkable;
  }

  createWall(a,index) {

      a[index].style.background="grey";

  }
  createStop(a,index) {

      a[index].style.background="violet";


  }
  createpath(a,index){


    a[index].style.background="black";
  }
  removeNode(a,index){
    a[index].style.background="";
  }
   toggleOccupied(){
     this.occupied=!this.occupied;
   }

}
//openlist
class openList{
  constructor(f,row,col){
    this.f=f;
    this.row=row;
    this.col=col;
  }
}

class closedList {
  constructor(i,j) {
    this.i=i;
    this.j=j;
    this.value=false;
  }
}


function isValid(row, col, size)
{
      return (row >= 0) && (row < size) &&
           (col >= 0) && (col < size);
}


function isDestionation( row, col, dest, size)
{
    if (row ==Math.floor(dest/size) && col == Math.floor(dest%size))
        return (true);
    else
        return (false);
}
function calculateHValue(row, col, dest, size)
{
    return Math.sqrt((row-Math.floor(dest/size))*(row-Math.floor(dest/size))+ (col-Math.floor(dest%size))*(col-Math.floor(dest%size)));
}
// final path via parents
function tracePath(a,eachnode,dest,size)
{

    var row = Math.floor(dest/size);
    var col = Math.floor(dest%size);

    var path=[];

    console.log(row);
    console.log(col);
    while (!((eachnode[row*size+col].parent_i == row) && (eachnode[row*size+col].parent_j == col )))
    {

        path.push(row*size+col);
        var temp_row = eachnode[row*size+col].parent_i;
        var temp_col = eachnode[row*size+col].parent_j;
        row = temp_row;
        col = temp_col;
    }
    console.log("entered");
    path.push(row*size+col);
    console.log(path);
    for(var i=1;i<path.length-1;i++)
    {

       eachnode[path[i]].createpath(a,path[i]);
    }

    return;
}



//astar search here

function astarSearch(a,eachnode,startpoints,endpoints,size)
{


  // initialize start node
   var i,j;

   i=Math.floor(startpoints[0]/size);
   j=Math.floor(startpoints[0]%size);
   console.log(i);
   console.log(j);
   eachnode[startpoints[0]].getFCost=0;
   eachnode[startpoints[0]].getGCost=0;
   eachnode[startpoints[0]].getHCost=0;
   eachnode[startpoints[0]].parent_i=i;
   eachnode[startpoints[0]].parent_j=j;
   //Put the starting cell on the open list and set its
   var openset= new Set;
   openset.clear;
   var closedset=[];
   var closedtemp;
   var tempArray=[];
   for(var i1=0;i1<size;i1++)
   {
     for(var j1=0;j1<size;j1++)
     {
     closedtemp = new closedList(i1,j1)
     closedset.push(closedtemp);
     }
   }
   var temp;
   temp =new openList(0,i,j)
   openset.add(temp);
   console.log(openset);
   var foundDest= false;
   while(openset.size>0)
   {
     tempArray = Array.from(openset);
     openset.delete(tempArray[0]);
     i=tempArray[0].row;
     j=tempArray[0].col;
     closedset[i*size+j].value=true;


   var gnew, hnew, fnew;

 //111111111111111111111111111111111111111111111111111111111111111111

   if(isValid(i-1,j,size)==true)
   {
     if(isDestionation(i-1,j,endpoints,size)==true)

     {
       eachnode[(i-1)*size+j].parent_i=i;
       eachnode[(i-1)*size+j].parent_j=j;
       tracePath(a,eachnode, endpoints, size);
       foundDest=true;
       return;

     }

   else if (closedset[(i-1)*size+j].value==false && eachnode[(i-1)*size+j].occupied==false) {

      console.log("entered1");
      gnew = eachnode[(i)*size+j].getGCost+1;
      hnew = calculateHValue(i-1,j,endpoints,size);
      fnew=gnew+hnew;
      if (eachnode[(i-1)*size+j].getFCost == Infinity ||  eachnode[(i-1)*size+j].getFCost > fnew)
               {
                   temp=new openList(fnew,i-1,j);
                   openset.add(temp);

                   // Update the details of this cell
                   eachnode[(i-1)*size+j].getFCost = fnew;
                   eachnode[(i-1)*size+j].getGCost = gnew;
                   eachnode[(i-1)*size+j].getHCost = hnew;
                   eachnode[(i-1)*size+j].parent_i = i;
                   eachnode[(i-1)*size+j].parent_j = j;
              }
      }

   }
   //22222222222222222222222222222222222222222222222222222222222222222222222222222
   if(isValid(i+1,j,size)==true)
   {
    // console.log(closedset[(i+1)*size+j].value);
     //console.log(eachnode[(i+1)*size+j].occupied);
     console.log("entered2");
     if(isDestionation(i+1,j,endpoints,size)==true)

     {
       eachnode[(i+1)*size+j].parent_i=i;
       eachnode[(i+1)*size+j].parent_j=j;
       tracePath(a,eachnode, endpoints, size);
       foundDest=true;
       return;

     }

   else if (closedset[(i+1)*size+j].value==false && eachnode[(i+1)*size+j].occupied==false) {

      gnew = eachnode[(i)*size+j].getGCost+1;
      hnew = calculateHValue(i+1,j,endpoints,size);
      fnew=gnew+hnew;
      if (eachnode[(i+1)*size+j].getFCost == Infinity ||  eachnode[(i+1)*size+j].getFCost > fnew)
               {
                   temp=new openList(fnew,i+1,j);
                   openset.add(temp);

                   // Update the details of this cell
                   eachnode[(i+1)*size+j].getFCost = fnew;
                   eachnode[(i+1)*size+j].getGCost = gnew;
                   eachnode[(i+1)*size+j].getHCost = hnew;
                   eachnode[(i+1)*size+j].parent_i = i;
                   eachnode[(i+1)*size+j].parent_j = j;
              }
      }

   }
   //33333333333333333333333333333333333333333333333333333333333333333333333333
   if(isValid(i,j+1,size)==true)
   {
     if(isDestionation(i,j+1,endpoints,size)==true)

     {
       eachnode[(i)*size+j+1].parent_i=i;
       eachnode[(i)*size+j+1].parent_j=j;
       tracePath(a,eachnode, endpoints,size);
       foundDest=true;
       return;

     }

   else if (closedset[(i)*size+j+1].value==false && eachnode[(i)*size+j+1].occupied==false) {
      console.log("entered3");
      gnew = eachnode[(i)*size+j].getGCost+1;
      hnew = calculateHValue(i,j+1,endpoints,size);
      fnew=gnew+hnew;
      if (eachnode[(i)*size+j+1].getFCost == Infinity ||  eachnode[(i)*size+j+1].getFCost > fnew)
               {
                   temp=new openList(fnew,i,j+1);
                   openset.add(temp);

                   // Update the details of this cell
                   eachnode[(i)*size+j+1].getFCost = fnew;
                   eachnode[(i)*size+j+1].getGCost = gnew;
                   eachnode[(i)*size+j+1].getHCost = hnew;
                   eachnode[(i)*size+j+1].parent_i = i;
                   eachnode[(i)*size+j+1].parent_j = j;
              }
      }

   }
   //444444444444444444444444444444444444444444444444444444444444444444
   if(isValid(i,j-1,size)==true)
   {
     if(isDestionation(i,j-1,endpoints,size)==true)

     {
       eachnode[(i)*size+j-1].parent_i=i;
       eachnode[(i)*size+j-1].parent_j=j;
       tracePath(a,eachnode, endpoints,size);
       foundDest=true;
       return;

     }

   else if (closedset[(i)*size+j-1].value==false && eachnode[(i)*size+j-1].occupied==false) {
      console.log("entered4");
      gnew = eachnode[(i)*size+j].getGCost+1;
      hnew = calculateHValue(i,j-1,endpoints,size);
      fnew=gnew+hnew;
      if (eachnode[(i)*size+j-1].getFCost == Infinity ||  eachnode[(i)*size+j-1].getFCost > fnew)
               {
                   temp=new openList(fnew,i,j-1);
                   openset.add(temp);

                   // Update the details of this cell
                   eachnode[(i)*size+j-1].getFCost = fnew;
                   eachnode[(i)*size+j-1].getGCost = gnew;
                   eachnode[(i)*size+j-1].getHCost = hnew;
                   eachnode[(i)*size+j-1].parent_i = i;
                   eachnode[(i)*size+j-1].parent_j = j;
              }
      }
    }
      //5555555555555555555555555555555555555555555555555555555555555555555555555
      if(isValid(i-1,j+1,size)==true)
      {
        if(isDestionation(i-1,j+1,endpoints,size)==true)

        {
          eachnode[(i-1)*size+j+1].parent_i=i;
          eachnode[(i-1)*size+j+1].parent_j=j;
          tracePath(a,eachnode, endpoints,size);
          foundDest=true;
          return;

        }

      else if (closedset[(i-1)*size+j+1].value==false && eachnode[(i-1)*size+j+1].occupied==false) {
         console.log("entered5");
         gnew = eachnode[(i)*size+j].getGCost+1.414;
         hnew = calculateHValue(i-1,j+1,endpoints,size);
         fnew=gnew+hnew;
         if (eachnode[(i-1)*size+j+1].getFCost == Infinity ||  eachnode[(i-1)*size+j+1].getFCost > fnew)
                  {
                      temp=new openList(fnew,i-1,j+1);
                      openset.add(temp);

                      // Update the details of this cell
                      eachnode[(i-1)*size+j+1].getFCost = fnew;
                      eachnode[(i-1)*size+j+1].getGCost = gnew;
                      eachnode[(i-1)*size+j+1].getHCost = hnew;
                      eachnode[(i-1)*size+j+1].parent_i = i;
                      eachnode[(i-1)*size+j+1].parent_j = j;
                 }
         }

      }
      //666666666666666666666666666666666666666666666666666666666666666666666666666666666666
      if(isValid(i-1,j-1,size)==true)
      {
        if(isDestionation(i-1,j-1,endpoints,size)==true)

        {
          eachnode[(i-1)*size+j-1].parent_i=i;
          eachnode[(i-1)*size+j-1].parent_j=j;
          tracePath(a,eachnode, endpoints,size);
          foundDest=true;
          return;

        }

      else if (closedset[(i-1)*size+j-1].value==false && eachnode[(i-1)*size+j-1].occupied==false) {
         console.log("entered6");
         gnew = eachnode[(i)*size+j].getGCost+1.414;
         hnew = calculateHValue(i-1,j-1,endpoints,size);
         fnew=gnew+hnew;
         if (eachnode[(i-1)*size+j-1].getFCost == Infinity ||  eachnode[(i-1)*size+j-1].getFCost > fnew)
                  {
                      temp=new openList(fnew,i-1,j-1);
                      openset.add(temp);

                      // Update the details of this cell
                      eachnode[(i-1)*size+j-1].getFCost = fnew;
                      eachnode[(i-1)*size+j-1].getGCost = gnew;
                      eachnode[(i-1)*size+j-1].getHCost = hnew;
                      eachnode[(i-1)*size+j-1].parent_i = i;
                      eachnode[(i-1)*size+j-1].parent_j = j;
                 }
         }

      }
      //7777777777777777777777777777777777777777777777777777777777777777777777777
      if(isValid(i+1,j+1,size)==true)
      {
        if(isDestionation(i+1,j+1,endpoints,size)==true)

        {
          eachnode[(i+1)*size+j+1].parent_i=i;
          eachnode[(i+1)*size+j+1].parent_j=j;
          tracePath(a,eachnode, endpoints,size);
          foundDest=true;
          return;

        }

      else if (closedset[(i+1)*size+j+1].value==false && eachnode[(i+1)*size+j+1].occupied==false) {
         console.log("entered7");
         gnew = eachnode[(i)*size+j].getGCost+1.414;
         hnew = calculateHValue(i+1,j+1,endpoints,size);
         fnew=gnew+hnew;
         if (eachnode[(i+1)*size+j+1].getFCost == Infinity ||  eachnode[(i+1)*size+j+1].getFCost > fnew)
                  {
                      temp=new openList(fnew,i+1,j+1);
                      openset.add(temp)

                      // Update the details of this cell
                      eachnode[(i+1)*size+j+1].getFCost = fnew;
                      eachnode[(i+1)*size+j+1].getGCost = gnew;
                      eachnode[(i+1)*size+j+1].getHCost = hnew;
                      eachnode[(i+1)*size+j+1].parent_i = i;
                      eachnode[(i+1)*size+j+1].parent_j = j;
                 }
         }

      }
      //88888888888888888888888888888888888888888888888888888888888888888888
      if(isValid(i+1,j-1,size)==true)
      {
        if(isDestionation(i+1,j-1,endpoints,size)==true)

        {
          eachnode[(i+1)*size+j-1].parent_i=i;
          eachnode[(i+1)*size+j-1].parent_j=j;
          tracePath(a,eachnode, endpoints,size);
          foundDest=true;
          return;

        }

      else if (closedset[(i+1)*size+j-1].value==false && eachnode[(i+1)*size+j-1].occupied==false) {
          console.log("entered8");
         gnew = eachnode[(i)*size+j].getGCost+1.414;
         hnew = calculateHValue(i+1,j-1,endpoints,size);
         fnew=gnew+hnew;
         if (eachnode[(i+1)*size+j-1].getFCost == Infinity ||  eachnode[(i+1)*size+j-1].getFCost > fnew)
                  {
                      temp=new openList(fnew,i+1,j-1);
                      openset.add(temp);

                      // Update the details of this cell
                      eachnode[(i+1)*size+j-1].getFCost = fnew;
                      eachnode[(i+1)*size+j-1].getGCost = gnew;
                      eachnode[(i+1)*size+j-1].getHCost = hnew;
                      eachnode[(i+1)*size+j-1].parent_i = i;
                      eachnode[(i+1)*size+j-1].parent_j = j;
                 }
         }

      }

  }
  if (foundDest == false)
        alert("not found");

    return;
}












// we will decide grid size accordingly
// this is for manuplating things as required for our project.
$(document).ready(function() {
    createGrid(20);
    var size=20;
     $(".grid").mouseover(function() {
         //$(this).css("background-color", "grey");
          $(this).css("cursor", "pointer");
         });
    var a=[],bt=[];
    var startpoints=[];
    var endpoints=[];

    var stops=[];
    var walls=[];
    var y=-1;
    var b=document.querySelectorAll('.b');
    var a=document.querySelectorAll('.grid');
    var tempnode;
    var eachnode=[];

    startpoints.push(0);

    endpoints.push(size*size-1);

    for(var i=0;i<size;i++)
    {
      for(var j=0;j<size;j++)
      {

          a[size*i+j].style.background="white";
        tempnode= new Node(size,i,j,true,startpoints,endpoints);

        console.log(tempnode.occupied)
        eachnode.push(tempnode);
      }
      console.log("success");

    }
    a[0].style.background="green";
    a[size*size-1].style.background="red";
    eachnode[0].toggleOccupied();
    eachnode[size*size-1].toggleOccupied();
    b.forEach(function(button,index){
      button.addEventListener('click',function(){
        console.log("button clicked");
        if(index==0)
        {
          y=0;
        }
        else if (index==1) {
          y=1;
        }
        else if (index==2) {
          y=2;
        }
        else if (index==3) {
          y=3;
        }
        else if (index==4) {
          startpoints=[];
          endpoints=[];
          startpoints.push(0);
          endpoints.push(size*size-1);

          eachnode=[];
          for(var i=0;i<size;i++)
          {
            for(var j=0;j<size;j++)
            {

              a[size*i+j].style.background="white";
              tempnode= new Node(size,i,j,true,startpoints,endpoints);

              console.log(tempnode.occupied)
              eachnode.push(tempnode);
            }
            console.log("success");

          }
          a[0].style.background="green";
          a[size*size-1].style.background="red";
          eachnode[0].toggleOccupied();
          eachnode[size*size-1].toggleOccupied();
        }
        else if (index==5) {
        astarSearch(a,eachnode,startpoints,endpoints,size);
        }
      });
    });
    a.forEach(function(button,index){
      button.addEventListener('click',function(){
        console.log("clicked");
        console.log(y);
        if(y==0)
        {
           console.log(eachnode[index].occupied);
           console.log(index);
           if(eachnode[index].occupied==false)
           {
             console.log("finally");
           startpoints.push(index);
           eachnode[index].toggleOccupied();
           eachnode[index].createStartNode(a,index);
           eachnode[startpoints[0]].removeNode(a,startpoints[0]);
           eachnode[startpoints[0]].toggleOccupied();
          startpoints[0]=startpoints[1];
          startpoints.pop();
          console.log(startpoints[0]);
          }
        }
        else if (y==1) {
          if(eachnode[index].occupied==false)
        {

          walls.push(index);
          eachnode[index].createWall(a,index);
          eachnode[index].toggleWalkable();
          eachnode[index].toggleOccupied();
          console.log(eachnode[index].walkable);
        }
        }
        else if (y==2) {
          if(eachnode[index].occupied==false)
          {
          stops.push(index);
          eachnode[index].createStop(a,index);
        }
        }
        else if (y==3) {
          if(eachnode[index].occupied==false){
          endpoints.push(index);
          eachnode[index].toggleOccupied(a,index);
          eachnode[index].createEndNode(a,index);
          eachnode[endpoints[0]].removeNode(a,endpoints[0]);
          eachnode[endpoints[0]].toggleOccupied();
          endpoints[0]=endpoints[1];
          endpoints.pop();
        }
        }






      });
    });



});
