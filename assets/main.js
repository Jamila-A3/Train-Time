// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB6fJBI9ATkJnKeQo9Mxir_sJsOo1VJhDI",
    authDomain: "jamila-ee826.firebaseapp.com",
    databaseURL: "https://jamila-ee826.firebaseio.com",
    projectId: "jamila-ee826",
    storageBucket: "jamila-ee826.appspot.com",
    messagingSenderId: "151693365172",
    appId: "1:151693365172:web:4f7ea27353813c80"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();

  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trnName = $("#train-name-input").val().trim();
    var trnDestination = $("#destination-input").val().trim();
    var trnStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var trnFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrn = {
      name: trnName,
      destination: trnDestination,
      start: trnStart,
      frequency: trnFrequency
    };
    
    // Uploads train data to the database

  database.ref().push(newTrn);

  // Logs everything to console
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.start);
  console.log(newTrn.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnStart = childSnapshot.val().start;
    var trnFrequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trnName);
    console.log(trnDestination);
    console.log(trnStart);
    console.log(trnFrequency);

    // Prettify the train start
  var trnStartPretty = moment.unix(trnStart).format("MM/DD/YYYY");
  
  // Calculate the minutes arrivals using hardcore math
  // To calculate the 
  var trnMinutes = moment().diff(moment(trnStart, "X"), "minutes");
  console.log(trnMinutes);

  // Calculate the minutes away
  var trnAway = trnMinutes - trnFrequency;
  console.log(trnAway);
  
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trnName),
    $("<td>").text(trnDestination),
    $("<td>").text(trnStartPretty),
    $("<td>").text(trnMinutes),
    $("<td>").text(trnAway),
    $("<td>").text(trnFrequency)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
