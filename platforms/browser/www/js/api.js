const authHeader = localStorage.getItem('authHeader');
const baseUrl = localStorage.getItem('baseUrl');
const headers = new Headers({
  Authorization: authHeader,
  'Content-Type': 'application/json',
});

function verify(slotId, content) {
  return fetch(baseUrl + '/scan/' + slotId, {
    method: 'POST',
    headers: headers,
    redirect: 'follow',
    body: JSON.stringify({
      content: content,
    }),
  })
    .then((response) => response.text())
    .catch((error) => console.log('error', error));
}

function getEvents() {
  return fetch(baseUrl + '/events', {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  })
    .then((response) => response.text())
    .catch((error) => console.log('error', error));
}
