$(document).ready(function () {
  var time;
  function updateTime() {
    time = moment();
    var dateTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").text(dateTime);
    setTimeout(updateTime, 1000);
  }
  var today = moment().format("L");
  console.log(today);
  updateTime();
  var timeSlots = [];
  $(".input-group-text").each(function () {
    var hourID = $(this).attr("id");
    var timeSlot = moment();
    timeSlot.minute(0);
    timeSlot.second(0);
    timeSlot.hour(hourID);
    timeSlot.date(today);
    var slotHour = timeSlot.hour();
    var thisHour = time.hour();
    thisInput = $(this).parent().next();
    function inputTimeChecker() {
      if (timeSlot.isBefore(time) && slotHour !== thisHour) {
        thisInput.attr("class", "bg-secondary form-control text-white");
      } else if (slotHour === thisHour) {
        thisInput.attr("class", "bg-primary  form-control text-white");
      } else if (timeSlot.isAfter(time)) {
        thisInput.attr("class", "bg-success form-control text-white");
      }
      setTimeout(inputTimeChecker, 60000);
    }
    inputTimeChecker();
  });
  var events = [];
  var savedEvents = JSON.parse(localStorage.getItem("savedEvents"));
  if (savedEvents !== null) {
    events = savedEvents;
  }
  $(".btn").each(function () {
    for (var i = 0; i < events.length; i++) {
      if ($(this).attr("id") === events[i].location) {
        $(this).parent().prev().val(events[i].input);
      }
    }
  });
  $(".btn").on("click", function () {
    var savedInput = $(this).parent().prev().val();
    var thisId = $(this).attr("id");
    if (savedInput === "") {
      return;
    }
    var savedObject = {
      input: savedInput,
      location: thisId,
    };
    events.push(savedObject);
    localStorage.setItem("savedEvents", JSON.stringify(events));
  });
});
