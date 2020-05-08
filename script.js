$(document).ready(function () {
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
