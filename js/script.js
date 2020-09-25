var index = 0;
var time = 8;
var tableTime = 8;

var descriptList = localStorage.descriptList; 

//Checking if the timeslot is past/present/future and return the result
function deterColor(time){
    if (moment().hour() - time == 0) var result = "present";
    else if (moment().hour() - time < 0) var result = "future";
    else var result = "past";
    return result;
}

//Updating the description
function saveToLocal(event){
    var indexList;
    if(event.target.matches("button") || event.target.matches("i")){
        //In case the icon is clicked
        if(event.target.matches("button")) indexList = event.target.value;
        else indexList = event.target.parentElement.value;

        //Updating the description with its respective index.
        descriptList[indexList] = $(`#slot${indexList}`).val();
    }
    //Updating the description in localStorage
    localStorage.descriptList = JSON.stringify(descriptList);
    alert("Saved!");

}

//Load description
function writeDescript(){
    for (let i = 0; i < descriptList.length; i++){
        if(descriptList[i] != null){
            $(`#slot${i}`).text(descriptList[i]);
        }
    }
}

//Generate timetable 
function makeTable(){
    var tableTime2;
    var color = deterColor(time);
    if(tableTime > 12){
        tableTime = 1;
        tableTime2 = "PM";
    } else if (time < 12){
        tableTime2 = "AM";
    } else tableTime2 = "PM";

    $(".container").append(`
        <div class="input-group">
            <div class="input-group-prepend time-block">
                <label class="input-group-text">${tableTime}${tableTime2}</label>
            </div>
            <textarea class="form-control text-dark font-weight-bold description ${color}" id="slot${index}"></textarea>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary saveBtn" value="${index}"><i class="fas fa-calendar-plus fa-lg"></i></button>
            </div>
        </div>
    `);

    index++;
    tableTime++;
    time++;
}

//Clear schedule when "Clear schedule" is pressed
function clearSchedule(event){
    //Checking if the actual button is pressed
    if(!event.target.matches("button")) return;

    //Made a blank descriptionList and update its localStorage copy before reloading the page
    descriptList = [];
    localStorage.descriptList = JSON.stringify(descriptList);
    location.reload();
}

$(document).ready(function(){
    //Initial Setup
    $("#currentDay").text(moment().format("ddd MMM Do, YYYY h:mm:ss a"))
    for(let i = 0; i < 16; i++) makeTable(); //Make 16 rows

    //Checking if there is a localStorage
    if (descriptList) {
        descriptList = JSON.parse(descriptList);
        writeDescript();
    }
    else {
        descriptList = [];
        localStorage.descriptList = JSON.stringify(descriptList);
    } 
    
    //Updating clock in Jumbotron
    setInterval(function(){
        $("#currentDay").text(moment().format("ddd MMM Do, YYYY h:mm:ss a"))
    }, 1000);

    $(".saveBtn").on("click", saveToLocal);
    $("#clearBtn").on("click", clearSchedule);
});