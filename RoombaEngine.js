function loadFileAsText(){
    //File location
    const fileToLoad = document.getElementById("fileToLoad").files[0];
    //Initialize file reader
    const fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent){
        //Load in text file, splitting by line
        const textFromFileLoaded = fileLoadedEvent.target.result.split('\n');

        //Load in gridSize, which are always the first line
        const gridSize = textFromFileLoaded[0].split(' ');
        document.getElementById("coordinates").value = gridSize;

        //Load in hoover position, which is always the second line
        let roombaPosition = textFromFileLoaded[1].split(' ').map(Number);
        document.getElementById("roombaPosition").value = roombaPosition;

        //Load in locations of dirt. These are all lines after the second and before the last
        let locationsOfDirt = [];
        for(let line=2; line < textFromFileLoaded.length -1; line++) {
            locationsOfDirt.push(textFromFileLoaded[line].split(' ').map(Number));
        }
        document.getElementById("dirtLocations").value = locationsOfDirt;

        //Load in driving instructions, which are always the last line
        const drivingInstructions = textFromFileLoaded[textFromFileLoaded.length - 1].split('');
        document.getElementById("drivingInstructions").value = drivingInstructions;

        initializeRoomba(gridSize, roombaPosition, locationsOfDirt, drivingInstructions);
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
}

function initializeRoomba (gridSize, roombaPosition, locationsOfDirt, drivingInstructions){

    let visitedLocations = [];

    //Move Roomba and mark down visited locations
    for (let i = 0; i < drivingInstructions.length; i++){
        moveRoomba(roombaPosition, drivingInstructions[i], gridSize);
        visitedLocations.push([roombaPosition[0], roombaPosition[1]]);
    }

    //Check how much dirt we were able to collect
    let numberOfDirtCollected = checkForDirt(locationsOfDirt, visitedLocations);

    console.log("Hoover final position: " + visitedLocations[visitedLocations.length -1][0] + ' ' +  visitedLocations[visitedLocations.length -1][1]);
    console.log("Amount of dirt collected: " + numberOfDirtCollected);
}

function moveRoomba(roombaPosition, direction, gridSize){
    switch(direction){
        case 'E':
            if(roombaPosition[0] < gridSize[0])
                roombaPosition[0]++;
            break;
        case 'W':
            if(roombaPosition[0] > 0)
                roombaPosition[0]--;
            break;
        case 'N':
            if(roombaPosition[1] < gridSize[1])
                roombaPosition[1]++;
            break;
        case 'S':
            if(roombaPosition[1] < gridSize[1])
                roombaPosition[1]--;
            break;
    }
}

function checkForDirt(locationsOfDirt, visitedLocations){
    let numberOfDirtCollected = 0;

    //Compare arrays in visited locations, and locations of dirt
    //If a match is found, dirt is cleaned and eliminated from our dirt locations array
    for (let i = 0; i < visitedLocations.length; i++){
        for (let j = 0; j < locationsOfDirt.length; j++){
            if( (locationsOfDirt[j][0] === visitedLocations[i][0]) && (locationsOfDirt[j][1] === visitedLocations[i][0])){
                numberOfDirtCollected++;
                locationsOfDirt.splice(j);
            }
        }
    }

    return numberOfDirtCollected;
}