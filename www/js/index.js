const validAudio = new Audio('audio/valid.wav');
const invalidAudio = new Audio('audio/invalid.wav');

function onDeviceReady() {
  // $('body').animateHighlight('yellow', 1000);

  $('#scan-settings').on('click', function () {
    scan().then((result) => {
      try {
        settings = JSON.parse(result.text);
        if (!('authHeader' in settings)) {
          throw new Error('Invaid object');
        }
      } catch (error) {
        return alert('Invalid! Scan the QR code from the Admin page');
      }

      alert('Successfully Installed');
      localStorage.setItem('authHeader', settings.authHeader);
      localStorage.setItem('baseUrl', settings.baseUrl);
      window.location.reload(true);
    });
  });

  if (!localStorage.getItem('baseUrl')) {
    alert('Scan Settings QR');
    return;
  }

  loadEvents();

  $('#scan').on('click', function () {
    $('body').removeClass('bg-success').removeClass('bg-danger');
    $('#message').hide();
    const slotId = $('#slots').val();

    if (!slotId) {
      return alert('Select event');
    }

    scan()
      .then((qrResult) => {
        return verify(slotId, qrResult.text);
      })
      .then((verifyResult) => {
        verifyResult = JSON.parse(verifyResult);

        if (!verifyResult.valid) {
          throw new Error(verifyResult.message);
        }

        valid();
        message(verifyResult.message, false);
      })
      .catch((err) => {
        invalid();
        message(err.message, true);
      });
  });
}

function valid() {
  validAudio.play();
  // $('body').animateHighlight('#28a745', 1000);
}

function invalid() {
  invalidAudio.play();
  // $('body').animateHighlight('#dc3545', 1000);
}

function message(text, negative) {
  if (negative) {
    $('#message, body').addClass('bg-danger').removeClass('bg-success');
  } else {
    $('#message, body').addClass('bg-success').removeClass('bg-danger');
  }

  $('#message .content').text(text);
  $('#message').show();
}

function loadEvents() {
  getEvents()
    .then((result) => {
      const events = JSON.parse(result);
      const options = [];

      events.forEach((event) => {
        event.slots.forEach((slot) => {
          $('#slots').append(new Option(`${slot.name} ${slot.date} ${slot.time}`, slot.id));
        });
      });
    })
    .catch((err) => {
      message(err.message, true);
    });
}

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener('deviceready', onDeviceReady, false);
} else {
  onDeviceReady();
}
