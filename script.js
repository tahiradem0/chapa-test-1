document.getElementById("payBtn").addEventListener("click", async () => {
  const txRef = "tx-" + Date.now(); // unique transaction reference

  // Send request to Chapa API
  const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_SECRET_KEY" // replace with demo key
    },
    body: JSON.stringify({
      amount: "1000",
      currency: "ETB",
      email: "customer@example.com",
      first_name: "John",
      last_name: "Doe",
      tx_ref: txRef,
      callback_url: "https://example.com/callback", 
      return_url: "https://example.com/success"
    })
  });

  const data = await response.json();
  if (data.status === "success") {
    window.location.href = data.data.checkout_url;
  } else {
    alert("Payment failed: " + data.message);
  }
});
