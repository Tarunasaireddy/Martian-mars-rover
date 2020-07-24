# Basic Usage:

Martian-Mars-Rover is used to help the Mars Curiosity Rover reach its final destination,i.e, Mars,via the shortest path, to make a permanent human settlement there.


# Additional Features:

1. The rover may have to pass through a stop before reaching Mars, in order to stay their for some time and collect some information about that place in space.
2. If Aliens are also on their way to colonize Mars, our Rover will make a Safety Search to know before hand about who will be successful, and get ready for a possible battle if both of them reach Mars at the same time. In this case the Rover doesn't go through the stop as its first priority is to reach Mars as soon as possible. 
3. Number of boxes per side can be changed by user input through the New Grid button which helps in finding distance with high precision with increase in boxes per side.


# Instructions and Description of the available buttons:

1. Select the Starting Point(Rover), Ending Point(Mars), Obstacles and Stop
   
    <b>Start:</b> Selects the starting point of the Rover.

    <b>Obstacles(Optional):</b>Selects the obstacles in the path.

    <b>Add Stop(Optional):</b> Selects a stop in the path. 

    <b>End:</b> Selects the position of Mars, i.e., the ending point of the Rover.

    <b>New Grid:</b> Makes a new grid, with the number of blocks on each side taken as user input.

2. Select Algorithm to find the shortest path(if no Aliens are present)

    <b>AStarSearch:</b> Uses AStar Search method to find the shortest path from Rover to Mars passing through a
                stop(if present).
    <b>BreadthFirstSearch:</b> Uses Breadth First Search method to find the shortest path from Rover to 
                        Mars passing through a stop(if present).

3. To know who will be successful in colonizing Mars, The Aliens or our Rover

   <b> Add Alien(Optional):</b> Selects the position of the Aliens' Rover who are heading to Mars too.

    <b>Safety Search:</b> Makes a search for the safety of our Rover, and predicts who will be successful in
                   reaching Mars first by comparing current distance via shortest path from Mars. 


