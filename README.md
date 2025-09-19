# Chapa Gateway v1

A simple Node.js & Express payment integration using **Chapa API**.

---

## Screenshot

![Code Editor Screenshot](public/Screenshot_20250919_020742_Code_Editor.png)

A simple Node.js & Express payment integration using **Chapa API**. This project allows users to pay for a subscription (demo: 1000 ETB) and view a success page after the payment is completed.

---

## Features

- **Chapa payment initialization** with email, name, amount, and currency.
- **Payment verification** endpoint to confirm transactions.
- **Success page** served after a successful payment.
- **Frontend UI** with a simple "Pay" button.
- **CORS & JSON handling** enabled for seamless API communication.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Payment Gateway:** [Chapa](https://chapa.co)
- **Dependencies:** 
  - `express`
  - `node-fetch`
  - `cors`
  - `path`
  - `url` (Node.js built-in)

---

## Project Structure

chapa-gateway-v1/ ├─ assets/ │  └─ Screenshot_20250919_020742_Code_Editor.png ├─ public/ │  ├─ style.css │  ├─ success.html │  └─ index.html ├─ server.js ├─ package.json └─ README.md

- `server.js`: Main Express server handling payment creation and verification.
- `public/`: Contains all frontend files (HTML, CSS, JS).
- `assets/`: Contains images for README or documentation.
- `success.html`: Page displayed after successful payment.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tahiradem0/chapa-test-1.git
cd chapa-test-1

2. Install dependencies

npm install

3. Set Chapa secret key

Create a .env file in the root:

CHAPA_SECRET_KEY=YOUR_CHAPA_SECRET_KEY
PORT=3000

4. Start the server

node server.js

Server runs on http://localhost:3000.

5. Test the payment

Open your browser at http://localhost:3000.

Click Pay 1000 ETB.

Complete the Chapa payment flow.

After success, you will be redirected to success.html.



---

API Endpoints

1. Create Payment

POST /create-payment

Body parameters:

Key	Type	Required	Description

email	string	Yes	User email
first_name	string	Yes	User first name
last_name	string	Yes	User last name
amount	number	No	Payment amount (default 1000)
currency	string	No	Payment currency (default ETB)


Response:

{
  "status": "success",
  "data": {
    "checkout_url": "...",
    ...
  }
}


---

2. Verify Payment

GET /verify-payment?tx_ref=<transaction_reference>

Response:

{
  "status": "success",
  "data": { ... }
}


---

3. Payment Success Page

GET /payment-success

Displays success.html.


---

Notes

This project is for demo/testing purposes.

Replace the demo secret key with your Chapa live key for production.

Frontend UI can be customized in public/index.html and public/style.css.



---

License

MIT License


---

Made with ❤️ by Tahir Adem
