"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = characteristics(people); 
      break;
      default:
    app(people); // restart app
      break;
  }
  if(searchResults.length > 1){
    displayPeople(searchResults)
  }
  else{
    mainMenu(searchResults, people);
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  
}

function characteristics(people){
  let searchResults = people;
  let searchType;
  while(searchType != "6"){
    searchType = prompt("Enter in all known characteristics and when finished press 6 to see results. \nType 1 to enter eye color. \nPress 2 to enter height. \nPress 3 to enter weight. \nPress 4 to enter gender. \nPress 5 to enter occupation. \nPress 6 to see results");
  
    switch(searchType){
      case '1':
        searchResults = searchByEyeColor(searchResults);
        break;
      case '2':
        searchResults = searchByHeight(searchResults);
        break;
      case '3':
        searchResults = searchByWeight(searchResults);
        break;
      case '4':
        searchResults = searchByGender(searchResults);
        break;
      case '5':
        searchResults = searchByOccupation(searchResults);
        break;
      case '6':
        break;
        default:
      app(people);
      break;
    }
  }
  
  if(searchResults.length > 0){
    displayPeople(searchResults)
  }
  else{
    mainMenu(searchResults, people);
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
      alert("Could not find that individual.");
      return app(people); // restart
    }
  
  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  if(displayOption === null) {
    app(people)
  }
  else{
    displayOption = displayOption.toLowerCase();
  
  switch(displayOption){
    case "info":
    displayPerson(person, people);
    break;
    case "family":
    displayFamily(person, people);
    break;
    case "descendants":
    displayDescendants(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

let person;
let personFoundArry = people.filter(function (element){
  if(element.firstName.toLowerCase() === firstName.toLowerCase() && element.lastName.toLowerCase() === lastName.toLowerCase()){
    return true;
  }
}) ;
person = personFoundArry.pop();

mainMenu(person, people)
// TODO: find the person single person object using the name they ent
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("what is the person's eye color?", autoValid);

  let personsEyeColor = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  });
  
  return personsEyeColor;
}

//TODO: add other trait filter functions here.
function searchByHeight(people){
  let height = parseInt(promptFor("What is the person's Height?", autoValid));

  let personsHeight = people.filter(function(potenialMatch){
    if(potenialMatch.height === height){
      return true;
    }
    else if(potenialMatch.personsHeight === ""){
      return true;
    }
    else{
      return false;
    }
  })
  //
  return personsHeight;
}

function searchByWeight(people){
  let weight = parseInt(promptFor("What is the person's weight?", autoValid));

  let personsWeight = people.filter(function(potentialMatch){
    if(potentialMatch.weight === weight){
      return true;
    }
    else if(potentialMatch.personsWeight === ""){
      return true;
    }
    else{
      return false;
    }
  })
  //
  return personsWeight;
}
function searchByGender(people){
  let gender = promptFor("What is the peron's Gender", autoValid);

  let personsGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }
    else if(potentialMatch.personsGender === ""){
      return true;
    }
    else{
      return false;
    }
  })
  //
  return personsGender; 
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", autoValid);

  let personsOccupation = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else if(potentialMatch.personsOccupation === ""){
      return true;
    }
    else{
      return false;
    }
  })
  //
  return personsOccupation;
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person, people){
  let spouse = getSpouse(person, people);
  let parents = getParents(person, people);
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + parents + "\n";
  personInfo += "Spouse: " + spouse;
    alert(personInfo);
    app(people);
}

function displayFamily(person, people){
  let parents = getParents(person, people);
  let spouse = getSpouse(person, people);
  let siblings = getSiblings(person, people);

  let family = "Parents:" + parents + "\n";
  family += "Spouse:" + spouse + "\n";
  family += "Siblings:" + siblings + "\n";
  alert(family);
  app(people);
}

function displayDescendants(person, people){
  let descendants = findDescendants(person, people);
 
  if(descendants.length === 0){
    descendants = "Descendants not in data."
  }

  alert(descendants);
  app(people);
}

function getParents(person, people){
  let parents = [];
  let parentsToReturn = "";
  if(person.parents.length === 0){
    return "Parents not in data set."
  }
  else{
    parents = people.filter(function(element){
      if(element.id === person.parents[0] || element.id === person.parents[1]){
        return true;
      }
    });
  }
  for(let i = 0; i < parents.length; i++){
    parentsToReturn += parents[i].firstName + " " + parents[i].lastName + ". ";
  }
  return parentsToReturn;
}

function getSpouse(person, people){
  let spouse;
  let spouseArray = [];
  let spouseToReturn = "";
  if(person.currentSpouse === null){
    return "Spouse not in data set.";
  }
  else{
    spouseArray = people.filter(function (element){
      if(element.id === person.currentSpouse){
        return true;
      }
    });
  }
  spouse = spouseArray.pop();
  spouseToReturn = spouse.firstName + " " + spouse.lastName;
  return spouseToReturn;
}

function getSiblings(person, people){
  let siblings = [];
  let siblingsToReturn = "";
  if(person.parents.length === 0){
    return "siblings not in data set."
  }
  else{
    siblings = people.filter(function (element){
      if(element.parents.length === 0){
        return false;
      }
      else if(element === person){
        return false;
      }
      else if(element.parents[0] === person.parents[0] || element.parents[0] === person.parents[1]){
        return true;
      }
      else if(element.parents[1] === person.parents[0] || element.parents[1] === person.parents[1]){
        return true;
      }
    });
  }
  for(let i = 0; i < siblings.length; i++){
    siblingsToReturn += siblings[i].firstName + " " + siblings[i].lastName + ". ";
  }
  return siblingsToReturn;
}

function findDescendants(person, people){
  let descendants = getDescendants(person, people);
  let descendantsToReturn = "";
  for(let i = 0; i < descendants.length; i++){
    descendantsToReturn += descendants[i].firstName + " " + descendants[i].lastName + ". ";
  }
  return descendantsToReturn;
}

function getDescendants(person, people){
  let descendants = [];

  descendants = people.filter(function(element){
    if(element.parents.length === 0){
      return false;
    }
    else if (element.parents[0] === person.id || element.parents[1] === person.id){
      return true;
    }
  });
  return descendants;
}
//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(!response || !valid(response));
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion