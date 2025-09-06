// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public"))); // serve frontend files

// Chapa secret key (demo)
const CHAPA_SECRET_KEY = "CHASECK_TEST-YkRejBwttPzdnqoVQsWJqVePVOFMQRxf";

// ✅ Create Chapa payment
app.post("/create-payment", async (req, res) => {
  try {
    const { amount, currency, email, first_name, last_name } = req.body;

    // Validate required fields
    if (!email || !first_name || !last_name) {
      return res.status(400).json({ error: "Missing required user information (email, first_name, last_name)" });
    }

    const txRef = "tx-" + Date.now(); // unique transaction reference

    const chapaResponse = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CHAPA_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: amount || "1000",
        currency: currency || "ETB",
        email,
        first_name,
        last_name,
        tx_ref: txRef,
        callback_url: "http://localhost:3000/payment-callback",
        return_url: "http://localhost:3000/payment-success?tx_ref=" + txRef,
      }),
    });

    if (!chapaResponse.ok) {
      const errorText = await chapaResponse.text();
      console.error("Chapa API error:", errorText);
      return res.status(chapaResponse.status).json({ error: "Chapa API error", details: errorText });
    }

    const data = await chapaResponse.json();
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});


// ✅ Verify payment
app.get("/verify-payment", async (req, res) => {
  const txRef = req.query.tx_ref;

  if (!txRef) {
    return res.status(400).json({ status: "error", message: "Missing transaction reference" });
  }

  try {
    const verifyResponse = await fetch(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${CHAPA_SECRET_KEY}` },
    });

    if (!verifyResponse.ok) {
      throw new Error(`Chapa API responded with status: ${verifyResponse.status}`);
    }

    const data = await verifyResponse.json();
    res.json(data);
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ status: "error", message: "Server verification failed" });
  }
});

// ✅ Serve success page
app.get("/payment-success", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/success.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
