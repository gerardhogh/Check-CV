fetch("http://localhost:3000/api/payments/simulate", { method: "POST" })
  .then(res => res.json().then(data => console.log(res.status, data)))
  .catch(console.error);
