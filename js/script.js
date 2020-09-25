var index = 0;
var time = 8;

var descriptList = localStorage.descriptList; 

//Checking if the timeslot is past/present/future
function deterColor(){
    var result;
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
    localStorage.descriptList = JSON.stringify(descriptList);
}

function writeDescript(){
    for (let i = 0; i < descriptList.length; i++){
        if(descriptList[i] != null){
            $(`#slot${i}`).text(descriptList[i]);
        }
    }
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
        <div class="input-group">
            <div class="input-group-prepend time-block">
                <label class="input-group-text">${time}${time2}</label>
            </div>
            <textarea class="form-control description ${color}" id="slot${index}"></textarea>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary saveBtn" value="${index}"><i class="fas fa-calendar-plus fa-lg"></i></button>
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
});