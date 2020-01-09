const priceElements = document.querySelectorAll('.price');

priceElements.forEach((el) => {
  el.textContent = new Intl.NumberFormat('en-US', {
    currency: 'usd',
    style: 'currency'
  }).format(el.textContent);
});


// Delete cart item
const cart = document.querySelector('#cart');

if (cart) {
  cart.addEventListener('click', ({target}) => {
    if (target.matches('.js-remove')) {
      const id = target.dataset.id
      
      fetch('/cart/remove/' + id, {
        method: 'delete'
      })
      .then(res => res.json())
      .then(cart => {
        console.log(cart);
      })
    }
  })
}