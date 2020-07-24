# Basic Structure of Martian-Mars-Rover 

1. A 2D grid (representing Space) is created with intial size of (20*20), whose size can be changed by  
   user input using the New Grid button. 

2. Each block of the grid is represented by a Node class having a number of data members and member
   functions to act on them.

3. Key Properties(not all) of different types of Nodes on the grid:

    <b>Start</b>: Red, Walkable, Occupied

    <b>End</b>: Green, Walkable, Occupied

    <b>Obstacle</b>: Grey, Not Walkable, Occupied

    <b>Stop</b>: Violet, Walkable, Occupied

    <b>Alien</b>: Yellow, Walkable, Occupied

4. Initially, the Start node is at <i>top-Left corner</i> of the grid and End Node is at <i>bottom-right corner</i> of the grid.

5. The blocks which are part of the shortest path are highlighted in black colour.

6. We have used <b>A* star</b> and <b>Breath first search</b> to find the shortest path.
