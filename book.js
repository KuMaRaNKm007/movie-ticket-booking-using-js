const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;


function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}


function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));



  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}


function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}


movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});


container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});


updateSelectedCount();


var submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function() {
  
  var selectedSeats = document.getElementsByClassName('seat selected');
  if (selectedSeats.length > 0) {
    var message = 'You have booked ' + selectedSeats.length + ' seat(s):\n';
    for (var i = 0; i < selectedSeats.length; i++) {
      message += '- Seat ' + selectedSeats[i].innerText + '\n';
      selectedSeats[i].classList.remove('selected');
      selectedSeats[i].classList.add('booked');
    }
    alert(message + 'Successfully booked!');
  } else {
    alert('Please select at least one seat.');
  }

  window.location.href = 'home.html';
});


var cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', function() {

  var selectedSeats = document.getElementsByClassName('seat selected');
  if (selectedSeats.length > 0) {
    for (var i = 0; i < selectedSeats.length; i++) {
      selectedSeats[i].classList.remove('selected');
    }
    alert('Successfully canceled!');
  } else {
    alert('No seats selected to cancel.');
  }
  
  window.location.href = 'home.html';
});
