const priceElements = document.querySelectorAll('.price');

priceElements.forEach((el) => {
  el.textContent = new Intl.NumberFormat('en-US', {
    currency: 'usd',
    style: 'currency'
  }).format(el.textContent);
})