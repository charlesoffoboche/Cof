// ===== GLOBALS =====
const form = document.getElementById("donationForm");
const loader = document.getElementById("loader");
const paymentModal = document.getElementById("paymentModal");

let formData = {};

// ===== FORM SUBMIT =====
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formData = Object.fromEntries(new FormData(form).entries());
  paymentModal.classList.remove("hidden"); // show gateway options
});

function closeModal() {
  paymentModal.classList.add("hidden");
}

// ===== GOOGLE SHEETS =====
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

// ===== PAYSTACK =====
function payWithPaystack() {
  PaystackPop.setup({
    key: 'pk_live_cda241f75676d49497194cb6ec6d7d458f46d727',
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

// ===== FLUTTERWAVE =====
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

// ===== UNIFIED GATEWAY RENDER =====
function showGateway(method) {
  // Hide all containers first
  document.querySelectorAll("#paystack-container, #flutterwave-container, #paypal-container, #stripe-container")
    .forEach(el => { el.classList.add("hidden"); el.innerHTML = ""; });

  formData.payment_method = method;
  loader.classList.add("hidden");

  if (method === "paystack") {
    const container = document.getElementById("paystack-container");
    container.classList.remove("hidden");
    const btn = document.createElement("button");
    btn.textContent = "Proceed with Paystack";
    btn.className = "bg-blue-600 text-white px-4 py-2 rounded";
    btn.onclick = payWithPaystack;
    container.appendChild(btn);

  } else if (method === "flutterwave") {
    const container = document.getElementById("flutterwave-container");
    container.classList.remove("hidden");
    const btn = document.createElement("button");
    btn.textContent = "Proceed with Flutterwave";
    btn.className = "bg-yellow-500 text-black px-4 py-2 rounded";
    btn.onclick = payWithFlutterwave;
    container.appendChild(btn);

  } else if (method === "paypal") {
    const container = document.getElementById("paypal-container");
    container.classList.remove("hidden");
    paypal.Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "paypal"
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: formData.amount,
              currency_code: formData.currency || "USD"
            }
          }]
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          formData.transaction_id = details.id;
          formData.payment_status = details.status;
          formData.payer_email = details.payer.email_address;
          formData.payer_name = details.payer.name.given_name + " " + details.payer.name.surname;
          sendToGoogleSheets(formData);
          closeModal();
        });
      },
      onError: function (err) {
        console.error("PayPal error:", err);
        alert("PayPal error occurred.");
      }
    }).render("#paypal-container");

  } else if (method === "stripe") {
    const container = document.getElementById("stripe-container");
    container.classList.remove("hidden");
    const btn = document.createElement("button");
    btn.textContent = "Proceed with Stripe";
    btn.className = "bg-purple-700 text-white px-4 py-2 rounded";
    btn.onclick = payWithStripe;
    container.appendChild(btn);
  }
}
