const ticketTitle = document.getElementById('title');
const ticketText = document.getElementById('text');
const dateNoticed = document.getElementById('datenoticed');
const todayDate = document.getElementById('todaydate');
const saveTicket = document.getElementById('saveButton');

const emptyTicket = () => {
ticketTitle.value = '';
ticketText.value = '';
dateNoticed.value = '';
todayDate.value = '';
}

const postTickets = (ticket) => 
fetch('/tickets', {
    method: 'POST',
    headers: {
        'Content-Type':'application/JSON',
    },
    body: JSON.stringify(ticket)
})
.then((res) => res.json())
.then((data) => {
    console.log('Successfull POST request', data);
})

saveTicket.addEventListener('click', postTickets)

ticketText.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a new review object from the input values
    const newTicket = {
      username: userNameInput.value.trim(),
      Title: ticketTitle.value.trim(),
      Text: ticketText.value.trim(),
      DateNoticed: dateNoticed.value.trim(),
      TodaysDate: todayDate.value.trim()
    };
  
    // Call our postReview method to make a POST request with our `newReview` object.
    postTickets(newTicket)
  });

saveTicket.addEventListener('click', postTickets)