const form = document.getElementById("donationForm");
const loader = document.getElementById("loader");
const paymentModal = document.getElementById("paymentModal");

let formData = {};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formData = Object.fromEntries(new FormData(form).entries());
  paymentModal.classList.remove("hidden"); // show gateway options
});

function closeModal() {
  paymentModal.classList.add("hidden");
}

function setPaymentMethod(method) {
  formData.payment_method = method;
  closeModal();
  loader.classList.remove("hidden");

  if (method === "paystack") {
    payWithPaystack();
  } else if (method === "flutterwave") {
    payWithFlutterwave();
  } else if (method === "paypal") {
    payWithPayPal();
  } else if (method === "stripe") {
    payWithStripe();
  }
}

// SEND to GOOGLE SHEETS
function sendToGoogleSheets(data) {
  fetch("https://script.google.com/macros/s/AKfycbyUfe2xhyJR6_U7Kgr3QNM1e5ZL2Jwr0clpO_VZMMMnCS-B1BSTspjIxRPZ4IVmWRvHeQ/exec", {
    method: "POST",
    body: new URLSearchParams(data),
  })
    .then(() => {
      loader.classList.add("hidden");
      window.location.href = 'thank-you.html';
    })
    .catch(() => {
      loader.classList.add("hidden");
      alert("Something went wrong while saving your data.");
    });
}

// PAYSTACK
function payWithPaystack() {
  PaystackPop.setup({
    key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxx',
    email: formData.email,
    amount: formData.amount * 100,
    currency: formData.currency,
    callback: function() {
      sendToGoogleSheets(formData);
    },
    onClose: function() {
      loader.classList.add("hidden");
      alert("Payment was not completed.");
    }
  }).openIframe();
}

// FLUTTERWAVE
function payWithFlutterwave() {
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-ef601382a596504da7b7ea38e0346d64-X",
    tx_ref: "tx-" + Date.now(),
    amount: formData.amount,
    currency: formData.currency,
    customer: {
      email: formData.email,
      phone_number: formData.phone,
      name: formData.name,
    },
    callback: function() {
      sendToGoogleSheets(formData);
    },
    onclose: function() {
      loader.classList.add("hidden");
      alert("Payment was not completed.");
    }
  });
}

// PAYPAL (placeholder)
function payWithPayPal() {
  alert("Redirecting to PayPal...");
  sendToGoogleSheets(formData); // ideally only after success
}

// STRIPE (placeholder)
function payWithStripe() {
  alert("Redirecting to Stripe...");
  sendToGoogleSheets(formData); // ideally only after success
}
