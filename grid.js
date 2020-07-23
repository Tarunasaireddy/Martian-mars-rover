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
function deletegrid(x){
 $(".grid").remove();
}
function refreshGrid(){
  var z = prompt("How many boxes per side?");
  deletegrid();
  return z;
};

// consider each block as a node
class Node {

constructor(size, posx, posy, walkable, startpoints,endpoints) {

  this.inPath = false;
  this.getGCost = Infinity;
  this.getHCost = Infinity;
  this.getFCost = Infinity;
  this.parent_i= -1;
  this.parent_j= -1;
  this.parent_ai= -1;
  this.parent_aj= -1;
  this.size = size;
  this.posx = posx;
  this.posy = posy;
  this.walkable = walkable;
  this.occupied= false;
  this.startpoints= startpoints;
  this.endpoints= endpoints;
  this.visited= false;
  this.alienvisited= false;
}

createStartNode(a,index) {

    a[index].style.background="green";

  }
createEndNode(a,index) {

    a[index].style.background="red";

}
createAlienNode(a,index) {

    a[index].style.background="yellow";

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
createpath(a,index) {

    a[index].style.background="black";

}
removeNode(a,index) {

    a[index].style.background="";

}
 toggleOccupied() {

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

function findNeighbours(x,y,size,allowDiagonal)
{
  var neighbours= []
  if(isValid(x-1,y,size)) neighbours.push([x-1,y]);
  if(isValid(x,y+1,size)) neighbours.push([x,y+1]);
  if(isValid(x+1,y,size)) neighbours.push([x+1,y]);
  if(isValid(x,y-1,size)) neighbours.push([x,y-1]);

  if(allowDiagonal==true)
  {
    if(isValid(x-1,y+1,size)) neighbours.push([x-1,y+1]);
    if(isValid(x+1,y+1,size)) neighbours.push([x+1,y+1]);
    if(isValid(x+1,y-1,size)) neighbours.push([x+1,y-1]);
    if(isValid(x-1,y-1,size)) neighbours.push([x-1,y-1]); 
  }
  return neighbours;
}



//astar search here

function astarSearch(a,eachnode,startpoints,endpoints,size,allowDiagonal,flag)
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

    var neighbours= findNeighbours(i,j,size,allowDiagonal);

    for(next of neighbours)
    {
      var x= next[0];
      var y= next[1];
      var ind= (x*size) + y;

      if(isValid(x,y,size)==true)
      {
        if(isDestionation(x,y,endpoints,size)==true)
        {
          eachnode[ind].parent_i=i;
          eachnode[ind].parent_j=j;
          if(flag==1)
          {
            tracePath(a,eachnode, endpoints, size);
          }
          foundDest=true;
          return;

        }

        else if (closedset[ind].value==false && eachnode[ind].occupied==false) 
        {
          console.log("entered1");
          gnew = eachnode[(i)*size+j].getGCost+1;
          hnew = calculateHValue(x,y,endpoints,size);
          fnew=gnew+hnew;

          if (eachnode[ind].getFCost == Infinity ||  eachnode[ind].getFCost > fnew)
          {
            temp=new openList(fnew,x,y);
            openset.add(temp);

            // Update the details of this cell
            eachnode[ind].getFCost = fnew;
            eachnode[ind].getGCost = gnew;
            eachnode[ind].getHCost = hnew;
            eachnode[ind].parent_i = i;
            eachnode[ind].parent_j = j;
          }
        }
      }
    }
  }

  if (foundDest == false)
      alert("not found");

  return;
}

//implementation of a queue
class Queue 
{
  constructor() {
    this.items=[];
  }
  enqueue(index) {
    this.items.push(index);
  }
  dequeue(index) {
    if(!this.isEmpty()) {
      return this.items.shift();
    }
  }
  front() {
    if(!this.isEmpty()) {
      return this.items[0];
    }
  }
  isEmpty() {
    return this.items.length==0;
  }

}

//breadthfirst search here
function breadthFirstSearch(a,eachnode,startpoints,endpoints,size,allowDiagonal)
{
  var i,j;
  i=Math.floor(startpoints[0]/size);
  j=Math.floor(startpoints[0]%size);

  var foundDest=false;
  var q=new Queue();

  //starting point is made parent of itself and added to the queue
  eachnode[startpoints[0]].parent_i=i;
  eachnode[startpoints[0]].parent_j=j;

  eachnode[startpoints[0]].visited=true;
  q.enqueue(startpoints[0]);

  while(q.isEmpty()==false)
  {
    var current= q.front();
    q.dequeue();
    if(current==endpoints[0])
    {
      foundDest=true;
      return;
    }
    i= Math.floor(current/size);
    j= Math.floor(current%size);

    //valid neighbouring blocks of the current block are added to an array
    var neighbours= findNeighbours(i,j,size,allowDiagonal);

    for(next of neighbours)
    {
      var x= next[0];
      var y= next[1];
      var ind= (x*size) + y;

      if(isDestionation(x,y,endpoints,size)==true)
      {
        eachnode[endpoints[0]].parent_i=i;
        eachnode[endpoints[0]].parent_j=j;
        tracePath(a,eachnode,endpoints,size);
        foundDest=true;
        return;
      } 

      //if a neighbour is not visited yet and is unoccupied, it is marked visited and added to the queue
      //its parent is the current block
      else if(eachnode[ind].visited==false && eachnode[ind].occupied==false)
      {
        eachnode[ind].parent_i=i;
        eachnode[ind].parent_j=j;

        eachnode[ind].visited=true;
        q.enqueue(ind);
      }

    }

  }
  if(foundDest == false)
    alert("not found");
  
  return;
}

// final alienpath via parents
function alienPath(a,eachnode,dest,size)
{
  var row = Math.floor(dest/size);
  var col = Math.floor(dest%size);

  var path=[];

  while (!((eachnode[row*size+col].parent_ai == row) && (eachnode[row*size+col].parent_aj == col )))
  {
      path.push(row*size+col);
      var temp_row = eachnode[row*size+col].parent_ai;
      var temp_col = eachnode[row*size+col].parent_aj;
      row = temp_row;
      col = temp_col;
  }

  path.push(row*size+col);
  return path;
}

// final roverpath via parents
function roverPath(a,eachnode,dest,size)
{
  var row = Math.floor(dest/size);
  var col = Math.floor(dest%size);

  var path=[];

  while (!((eachnode[row*size+col].parent_i == row) && (eachnode[row*size+col].parent_j == col )))
  {
      path.push(row*size+col);
      var temp_row = eachnode[row*size+col].parent_i;
      var temp_col = eachnode[row*size+col].parent_j;
      row = temp_row;
      col = temp_col;
  }

  path.push(row*size+col);
  console.log(path);
  return path;
}


function safetySearch(a,eachnode,startpoints,aliens,endpoints,size,allowDiagonal) 
{
  var distRover=0,distAlien=0;
  var i,j,ai,aj;

  i=Math.floor(startpoints[0]/size);
  j=Math.floor(startpoints[0]%size);
  ai=Math.floor(aliens[0]/size);
  aj=Math.floor(aliens[0]%size);

  var foundRover=false;
  var foundAlien=false;

  var roverpath,alienpath;

  var q=new Queue();
  var aq=new Queue();

  //starting point is made parent of itself and added to the queue
  eachnode[startpoints[0]].parent_i=i;
  eachnode[startpoints[0]].parent_j=j;

  eachnode[startpoints[0]].visited=true;
  q.enqueue(startpoints[0]);

  while(q.isEmpty()==false)
  {
    var current= q.front();
    q.dequeue();

    i= Math.floor(current/size);
    j= Math.floor(current%size);

    if(isDestionation(i,j,endpoints,size)==true)
    {
      foundRover=true;
      break;
    }

    //valid neighbouring blocks of the current block are added to an array
    var neighbours= findNeighbours(i,j,size,allowDiagonal);

    for(next of neighbours)
    {
      var x= next[0];
      var y= next[1];
      var ind= (x*size) + y;

      if(isDestionation(x,y,endpoints,size)==true)
      {
        eachnode[endpoints[0]].parent_i=i;
        eachnode[endpoints[0]].parent_j=j;
        foundRover=true;
        break;
      }

      //if a neighbour is not visited yet and is unoccupied, it is marked visited and added to the queue
      //its parent is the current block
      else if(eachnode[ind].visited==false && eachnode[ind].occupied==false)
      {
        eachnode[ind].parent_i=i;
        eachnode[ind].parent_j=j;

        eachnode[ind].visited=true;
        q.enqueue(ind);
      }

    }
    if(foundRover==true) break;
  }
  if(foundRover == false)
  {
    distRover=0;
  }
  else
  {
    roverpath=roverPath(a,eachnode,endpoints,size);
    distRover=roverpath.length-2;
  }

  //starting point is made parent of itself and added to the queue
  eachnode[aliens[0]].parent_ai=ai;
  eachnode[aliens[0]].parent_aj=aj;

  eachnode[aliens[0]].alienvisited=true;
  aq.enqueue(aliens[0]);

  while(aq.isEmpty()==false)
  {
    var current= aq.front();
    aq.dequeue();

    ai= Math.floor(current/size);
    aj= Math.floor(current%size);

    if(isDestionation(ai,aj,endpoints,size)==true)
    {
      foundAlien=true;
      break;
    }
    //valid neighbouring blocks of the current block are added to an array
    var neighbours= findNeighbours(ai,aj,size,allowDiagonal);

    for(next of neighbours)
    {
      var x= next[0];
      var y= next[1];
      var ind= (x*size) + y;

      if(isDestionation(x,y,endpoints,size)==true)
      {
        eachnode[endpoints[0]].parent_ai=ai;
        eachnode[endpoints[0]].parent_aj=aj;
        foundAlien=true;
        break;
      }

      //if a neighbour is not visited yet and is unoccupied, it is marked visited and added to the queue
      //its parent is the current block
      else if(eachnode[ind].alienvisited==false && eachnode[ind].occupied==false)
      {
        eachnode[ind].parent_ai=ai;
        eachnode[ind].parent_aj=aj;

        eachnode[ind].alienvisited=true;
        aq.enqueue(ind);
      }

    }
    if(foundAlien==true) break;
  }
  if(foundAlien == false)
  {
    distAlien=0;
  }
  else
  {
    alienpath=alienPath(a,eachnode,endpoints,size);
    distAlien=alienpath.length-2;
  }


  if(distRover!=0 && distAlien!=0)
  {
    if(distRover<distAlien)
    {
      alert(`Rover Distance=${String(distRover)}  Alien Distance=${String(distAlien)}
Our Rover will reach Mars first! :)`);
      for(var i=1;i<=distRover;i++)
      {
        eachnode[roverpath[i]].createpath(a,roverpath[i]);
      }
    }
    else if(distRover>distAlien)
    {
      alert(`Rover Distance=${String(distRover)}  Alien Distance=${String(distAlien)}
The Aliens will reach Mars first! :(`);
      for(var i=1;i<=distAlien;i++)
      {
        eachnode[alienpath[i]].createpath(a,alienpath[i]);
      }

    }
    else
    {
      alert(`Rover Distance=${String(distRover)}  Alien Distance=${String(distAlien)}
Both Rover and Aliens will reach Mars at the same time! Get ready for a BATTLE!!`);
      for(var i=1;i<=distRover;i++)
      {
        eachnode[roverpath[i]].createpath(a,roverpath[i]);
      }
      for(var i=1;i<=distAlien;i++)
      {
        eachnode[alienpath[i]].createpath(a,alienpath[i]);
      }
    }

  }

  else if(distRover==0 && distAlien==0)
  {
    alert("Neither our Rover nor the Aliens can reach Mars");
  }

  else if(distRover==0)
  {
    alert(`Alien Distance=${String(distAlien)}
The Aliens will reach Mars but our Rover cannot :(`);
    for(var i=1;i<=distAlien;i++)
    {
      eachnode[alienpath[i]].createpath(a,alienpath[i]);
    }
  }

  else if(distAlien==0)
  {
    alert(`Rover Distance=${String(distRover)}
Our Rover will reach Mars but the Aliens cannot :)`);
    for(var i=1;i<=distRover;i++)
    {
      eachnode[roverpath[i]].createpath(a,roverpath[i]);
    }
  }
}


function makenew(a,eachnode,size)
{
  for(var i=0;i<size*size;i++)
  {
    eachnode[i].getFCost=Infinity;
    eachnode[i].getGCost=Infinity;
    eachnode[i].getHCost=Infinity;
    eachnode[i].parent_i=-1;
    eachnode[i].parent_j=-1;
    eachnode[i].parent_ai=-1;
    eachnode[i].parent_aj=-1;
    eachnode[i].visited= false;
    eachnode[i].alienvisited= false;
  }
}





// we will decide grid size accordingly
// this is for manipulating things as required for our project.
$(document).ready(function() {

  var size=20;
  createGrid(size);
   $(".grid").mouseover(function() {
       //$(this).css("background-color", "grey");
        $(this).css("cursor", "pointer");
       });
  var a=[],bt=[];
  var startpoints=[];
  var endpoints=[];
  var stops=[];
  var walls=[];
  var aliens=[];
  var y=-1;
  var b=document.querySelectorAll('.btn');
  var a=document.querySelectorAll('.grid');
  var tempnode;
  var eachnode=[];
  var alienpresent= false;
  var allowDiagonal= false;
  var indicate=0;
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
        size=refreshGrid();
        stops=[];
        walls=[];
        aliens=[];
        alienpresent= false;
        indicate=0;
        createGrid(size);
        $(".grid").mouseover(function() {
            //$(this).css("background-color", "grey");
             $(this).css("cursor", "pointer");
            });
        a=[];
        a=document.querySelectorAll('.grid');
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
        a.forEach(function(button,index){
          button.addEventListener('click',function(){
            console.log("clicked");
            console.log(y);
            if(y==0)
            {
              if(indicate==0)
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
              
            }
            else if (y==1) 
            {
              if(eachnode[index].occupied==false)
              {
                if(indicate==0)
                {
                  walls.push(index);
                  eachnode[index].createWall(a,index);
                  eachnode[index].toggleWalkable();
                  eachnode[index].toggleOccupied();
                  console.log(eachnode[index].walkable);
                }
              }
            }

            else if (y==2) 
            {
              if(eachnode[index].occupied==false)
              {
                //console.log("hi");
                if(stops.length==0)
                {
                  if(indicate==0)
                  {
                  stops.push(index);
                  eachnode[index].createStop(a,index);
                  eachnode[index].toggleOccupied();
                  }
                }
                else{
                alert("more than one stop is not allowed");
                }

              }
            }
            else if (y==3) 
            {
              if(indicate==0)
              {
                if(eachnode[index].occupied==false)
                {
                  endpoints.push(index);
                  eachnode[index].toggleOccupied(a,index);
                  eachnode[index].createEndNode(a,index);
                  eachnode[endpoints[0]].removeNode(a,endpoints[0]);
                  eachnode[endpoints[0]].toggleOccupied();
                  endpoints[0]=endpoints[1];
                  endpoints.pop();
                }
              }
              
            }
            else if(y==7) 
            {
              if(eachnode[index].occupied==false)
              {
                if(indicate==0)
                {
                aliens.push(index);
                alienpresent= true;
                eachnode[index].toggleOccupied();
                eachnode[index].createAlienNode(a,index);
                if(aliens.length>1)
                {
                  eachnode[aliens[0]].removeNode(a,aliens[0]);
                  eachnode[aliens[0]].toggleOccupied();
                  aliens[0]=aliens[1];
                  aliens.pop();
                }
                }
    
              }
            }

          });
        });

      }
      else if (index==5) {
        var diag= document.getElementById("diagonal");
        if(diag.checked==true) allowDiagonal=true;
        else allowDiagonal=false;
        indicate++;
        //console.log("hi " + stops.length);
        if(indicate==1)
        {
          if(stops.length==0)
          {
            astarSearch(a,eachnode,startpoints,endpoints,size,allowDiagonal,1);
          }
          else 
          {
            astarSearch(a,eachnode,startpoints,stops,size,allowDiagonal,1);
            makenew(a,eachnode,size);
            astarSearch(a,eachnode,stops,endpoints,size,allowDiagonal,1);
          }
        }
        else{
          alert("Please click on New Grid to clear the grid");
        }

      }

      else if(index==6) {
        var diag= document.getElementById("diagonal");
        if(diag.checked==true) allowDiagonal=true;
        else allowDiagonal=false;
        indicate++;
        if(indicate==1)
        {
          if(stops.length==0)
          {
            breadthFirstSearch(a,eachnode,startpoints,endpoints,size,allowDiagonal);
          }
          else
          {
            breadthFirstSearch(a,eachnode,startpoints,stops,size,allowDiagonal);
            makenew(a,eachnode,size);
            breadthFirstSearch(a,eachnode,stops,endpoints,size,allowDiagonal);
          }
        }
        else{
          alert("Please click on New Grid to clear the grid");
        }

      }

      else if(index==7)
      {
        y=7;
      }
      else if(index==8)
      {
        if(alienpresent==true)
        {
          var diag= document.getElementById("diagonal");
          if(diag.checked==true) allowDiagonal=true;
          else allowDiagonal=false;
          indicate++;
          if(indicate==1)
          {
            safetySearch(a,eachnode,startpoints,aliens,endpoints,size,allowDiagonal);
          }
          else
          {
            alert("Please click on New Grid to clear the grid");
          }
          
        }
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
        if(indicate==0)
        {
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
        
      }
      else if (y==1) 
      {
        console.log(eachnode[index].walkable);
        if(eachnode[index].occupied==false)
        {
          if(indicate==0)
          {
            walls.push(index);
            eachnode[index].createWall(a,index);
            eachnode[index].toggleWalkable();
            eachnode[index].toggleOccupied();
            console.log(eachnode[index].walkable);
          }
        }
        else if(eachnode[index].walkable==false)
        {
          stops.push(index);
          eachnode[index].createStop(a,index);
          eachnode[index].toggleOccupied();
        }

      }
      else if (y==2) 
      {
        if(eachnode[index].occupied==false )
        {
          if(stops.length==0)
          {
            if(indicate==0)
            {
              stops.push(index);
              eachnode[index].createStop(a,index);
              eachnode[index].toggleOccupied();
            }
          }
          else
          {
             alert("more than one stop is not allowed");
          }

        }
      }
      else if (y==3) 
      {
        if(indicate==0)
        {
          if(eachnode[index].occupied==false)
          {
            endpoints.push(index);
            eachnode[index].toggleOccupied(a,index);
            eachnode[index].createEndNode(a,index);
            eachnode[endpoints[0]].removeNode(a,endpoints[0]);
            eachnode[endpoints[0]].toggleOccupied();
            endpoints[0]=endpoints[1];
            endpoints.pop();
          }
        }
      }
      else if(y==7) 
      {
        if(indicate==0){
        if(eachnode[index].occupied==false)
        {
          aliens.push(index);
          alienpresent= true;
          eachnode[index].toggleOccupied();
          eachnode[index].createAlienNode(a,index);
          if(aliens.length>1)
          {
            eachnode[aliens[0]].removeNode(a,aliens[0]);
            eachnode[aliens[0]].toggleOccupied();
            aliens[0]=aliens[1];
            aliens.pop();
          }

        }
        }
      }






    });
  });


});
