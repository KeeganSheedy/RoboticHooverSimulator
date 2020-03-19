# Introduction

This program simulates an imaginary robotic hoover navigating through a room, picking up any dirt that comes along the way. The size of the room, the locations of dirt, and the path the hoover takes is all dependent on the input given through a .txt file. 

## How to run

1. Start the program by opening index.html.
2. Upload the .txt file by clicking on the **Choose File** button and selecting your .txt file. 
3. Start the simulation by clicking on the **Load Selected File** button. 

## Input

Program input will be received in a file with the format described here.

Example:

```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```

* the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
* the second line holds the hoover position
* subsequent lines contain the zero or more positions of patches of dirt (one per line)
* the next line then always contains the driving instructions (at least one)

## Output 

The Hoover's final position and amount of dirt collected will be reported via the web browser's console. 
