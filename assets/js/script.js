// Declarations
var i = 0;
const timeNow = dayjs();

// Dayjs to display date in header
$('#currentDay').text(timeNow.format('MMMM D, YYYY'));

// All DOM interacting code wrapped in a function to run after site is rendered
$(document).ready(function() {

  // Add a listener for click events on the save button
  $('.saveBtn').on('click', function() {
    // Get the hour ID of the time block
    var hourId = $(this).closest('.time-block').attr('id');
    // Get the user input form the text area
    var userInput = $(this).siblings('.description').val();
    // Save the user input to local storage (hour ID as key)
    localStorage.setItem(hourId, userInput);
  });

  // Changing the class to match the current time
  // Gathering information on the time and the time block
  var currentHour = parseInt(dayjs().format('H'));
  $('.time-block').each(function() {
    var hourDiv = $(this);
    var hour = parseInt(hourDiv.attr('id').split('-')[1]);
    // Changing class to past, present, or future depending on current time
    if (hour < currentHour) {
      hourDiv.removeClass('present future').addClass('past')
    } else if (hour === currentHour) {
      hourDiv.removeClass('past future').addClass('present')
    } else if (hour > currentHour) {
      hourDiv.removeClass('past present').addClass('future')
    }
  });

  // Get saved input from local storage and display it
  $('.time-block').each(function() {
    var hourId = $(this).attr('id');
    var savedInput = localStorage.getItem(hourId);
    if (savedInput !== null) {
      $(this).children('.description').val(savedInput);
    }
  })
});

