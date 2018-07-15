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

// Adding train info on click of submit button
$("#train-submit").on("click", function () {
    event.preventDefault();

    // Get train info from html form
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

    // Add tain info to firebase database
    database.ref().push(newTrain);

    // Clear input form
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#first-train-input").val("");
    $("#train-frequency-input").val("");
});

// Populate train info to html
database.ref().on("child_added", function (childSnap) {
    console.log(childSnap.val());
    // Store data in variable to be added to html
    var trainName = childSnap.val().name;
    var trainDestination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTime;
    var trainFrequency = childSnap.val().frequency;

    // Create table elements
    var newRow = $("<tr>").addClass("train-hover").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextArrival(firstTrain, trainFrequency)),
        $("<td>").text(minutesAway(firstTrain, trainFrequency))
    );

    // Append rows to html table
    $("tbody").append(newRow);
})

// Calculate the next arrival time
function nextArrival(firstTime, frequency) {
    var currentTime = moment();
    var nextTrain = currentTime.add(minutesAway(firstTime, frequency), "minutes").format("hh:mm A");
    return nextTrain;
};

// Calculate how many minutes until the next train
function minutesAway(firstTime, frequency) {
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTime);
    console.log(firstTimeConverted);
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);
    var timeRemainder = diffTime % frequency;
    console.log(timeRemainder);
    var minutesTilTrain = frequency - timeRemainder;
    console.log(minutesTilTrain);
    return minutesTilTrain;
};

//Add clock to header of html
function clock() {
    $(".clock").html("<h3>" + moment().format("MMMM D YYYY hh:mm:ss A") + "</h3>");
}
setInterval(clock, 1000);