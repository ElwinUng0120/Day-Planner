var index = 0;
var time = 8;

var descriptList = localStorage.descriptList;
if (descriptList) descriptList = JSON.parse(descriptList);
else {
    descriptList = [];
    localStorage.descriptList = JSON.stringify(descriptList);
}

//Checking if the timeslot is past/present/future
function deterColor(){
    var result;
    return result;
}

function saveToLocal(){

}

//Generate timetable 
function makeTable(){
    var time2;
    var color = deterColor();

    if(time > 12){
        time = 1;
        time2 = "PM";
    } else if (time < 12){
        time2 = "AM";
    } else time2 = "PM";

    $(".container").append(`
        <div class="input-group" id="slot${index}" value="${index}">
            <div class="input-group-prepend time-block">
                <label class="input-group-text">${time}${time2}</label>
            </div>
            <textarea class="form-control description ${color}"></textarea>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary saveBtn"><i class="fas fa-calendar-plus fa-lg"></i></button>
            </div>
        </div>
    `);

    index++;
    time++;
}

$(document).ready(function(){
    //Initial Setup
    $("#currentDay").text(moment().format("ddd MMM Do, YYYY h:mm:ss a"))
    for(let i = 0; i < 16; i++) makeTable(); //Make 16 rows
    
    //Updating clock in Jumbotron
    setInterval(function(){
        $("#currentDay").text(moment().format("ddd MMM Do, YYYY h:mm:ss a"))
    }, 1000);
});