const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const { homeRoutes, coursesRoutes, addRoutes, cartRoutes } = require('./routes');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/cart', cartRoutes);


const PORT = process.env.PORT || 3000;

async function start() {

  try {
    const url = 'mongodb+srv://Murat:Lekskeistha199605@cluster0-hbghd.mongodb.net/shop'

    const options = {
      keepAlive: 1,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    };
    await mongoose.connect(url, options)
      .then(() => console.log('DB connected'));
  
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`);
    });
  } catch(e) {
    console.log(e);
  }

}

start();
