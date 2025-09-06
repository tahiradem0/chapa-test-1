document.getElementById("payBtn").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: "1000",
        currency: "ETB",
        email: "ademt0614@gmail.com",
        first_name: "Tahir",
        last_name: "Adem",
        callback_url: "http://localhost:3000/payment-callback",
        return_url: "http://localhost:3000/success.html"
      })
    });

    const data = await response.json();

    if (data.status === "success") {
      window.location.href = data.data.checkout_url;
    } else {
      alert("Payment failed: " + (data.message || JSON.stringify(data)));
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Payment request failed. Check console for details.");
  }
});
