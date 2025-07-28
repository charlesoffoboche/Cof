<script>
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwPKuETS8paXhGg0J1eveBkLsYbTiCgKLaw8MQc72CGZkZFoSe7Pf2gfg2-FM_6O1mO/exec';

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formMessage = document.getElementById('formMessage');

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'Success') {
        formMessage.innerHTML = `<div class="alert alert-success">Your message was sent successfully!</div>`;
        form.reset();
      } else {
        formMessage.innerHTML = `<div class="alert alert-danger">Something went wrong: ${data.message}</div>`;
      }
    })
    .catch(error => {
      formMessage.innerHTML = `<div class="alert alert-danger">Error sending message: ${error.message}</div>`;
    });
  });
</script>
