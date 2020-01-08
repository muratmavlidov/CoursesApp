const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'data', 'cart.json');

class Cart {

  static async add(course) {
    const cart = await Cart.fetch();

    const idx = cart.courses.findIndex((c) => c.id === course.id);
    const selectedCourse = cart.courses[idx];

    if (selectedCourse) {
      selectedCourse.count++;
      cart.courses[idx] = selectedCourse;
    } else {
      course.count = 1;
      cart.courses.push(course);
    }

    cart.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
        if (err) reject(err);
        else {
          resolve();
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(dataPath, 'utf-8', (err, content) => {
        if (err) reject(err)
        else {
          resolve(JSON.parse(content))
        }
      });
    })
  }

}

module.exports = Cart;