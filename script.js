$(document).ready(function () {
    var startHour = 9;
    var endHour = 17;
    var currentHour = dayjs().hour();
    var displayedHour = startHour;
  
    // Display current date at the top of the calendar
    var currentDate = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(currentDate);
  
    // Loop through each hour and create a timeblock
    for (var hour = startHour; hour <= endHour; hour++) {
      var timeblockEl = $("<div>")
        .attr("id", "hour-" + hour)
        .addClass("row time-block");
  
      // hour column
      var hourColEl = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(dayjs(hour, "h").format("hA"));
      timeblockEl.append(hourColEl);
  
      // description textarea
      var descriptionEl = $("<textarea>")
        .addClass("col-8 col-md-10 description");
      // Load any saved text from local storage
      var savedText = localStorage.getItem("hour-" + hour);
      if (savedText !== null) {
        descriptionEl.val(savedText);
      }
      timeblockEl.append(descriptionEl);
  
      // save button
      var saveBtnEl = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save");
      var saveIconEl = $("<i>")
        .addClass("fas fa-save")
        .attr("aria-hidden", "true");
      saveBtnEl.append(saveIconEl);
      timeblockEl.append(saveBtnEl);
  
      // Color code timeblock based on past, present, or future
      if (hour < currentHour) {
        timeblockEl.addClass("past");
      } else if (hour > currentHour) {
        timeblockEl.addClass("future");
      } else {
        timeblockEl.addClass("present");
      }
  
      // add timeblock to the page
      $(".container-lg").append(timeblockEl);
  
      displayedHour++;
    }
  
    // Set the values of the textareas from local storage
    for (var hour = startHour; hour <= endHour; hour++) {
      $("#hour-" + hour + " .description").val(
        localStorage.getItem("hour-" + hour)
      );
    }
  
    // Handle save button click
    $(".saveBtn").on("click", function () {
      var hour = $(this).parent().attr("id");
      var text = $(this).siblings(".description").val();
      localStorage.setItem(hour, text);
    });
  });
  