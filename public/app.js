const priceElements = document.querySelectorAll('.price');

const toCurrency = (price) => {
  return new Intl.NumberFormat('en-US', {
    currency: 'usd',
    style: 'currency'
  }).format(price);
}

priceElements.forEach((node) => {
  node.textContent = toCurrency(node.textContent);
})



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
        if (cart.courses.length) {
          const html = cart.courses.map(c => {
            return `
            <tr>
              <td>${c.title}</td>
              <td>${c.count}</td>
              <td>
                <button class="btn btn-small js-remove" data-id="${c.id}">
                  Удалить
                </button>
              </td>
            </tr>
            `
          }).join('');
          document.querySelector('tbody').innerHTML = html;
          document.querySelector('.price').textContent = toCurrency(cart.price);
        } else {
          location.reload();
        }
      })
    }
  })
}