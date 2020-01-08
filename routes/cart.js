const { Router } = require('express');
const Cart = require('../models/cart');
const Course = require('../models/course');
const router = Router();


router.post('/add', async (req, res) => {
  const course = await Course.getCourse(req.body.id);
  await Cart.add(course);
  res.redirect('/cart');
});

router.get('/', async (req, res) => {
  const cart = await Cart.fetch();

  res.render('cart', {
    title: 'Корзина',
    isCart: true,
    ...cart
  })
});

module.exports = router;