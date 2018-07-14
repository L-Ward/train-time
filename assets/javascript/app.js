// Initialize Firebase
var config = {
    apiKey: "AIzaSyCcs5MKqu2_JZz95K1nGtYDLiOFnaw-glo",
    authDomain: "leahsfirstfirebaseproject.firebaseapp.com",
    databaseURL: "https://leahsfirstfirebaseproject.firebaseio.com",
    projectId: "leahsfirstfirebaseproject",
    storageBucket: "leahsfirstfirebaseproject.appspot.com",
    messagingSenderId: "559743623378"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Adding employee infor on click of submit button
  $("#train-submit").on("click", function() {
      event.preventDefault();

    //get train info from form
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#train-frequency-input").val().trim();

    // Temporary object to hold train info
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: firstTrain,
        frequency: trainFrequency
    };

    //Add tain info to firebase database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    //clear input form
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#first-train-input").val("");
    $("#train-frequency-input").val("");
  });

  