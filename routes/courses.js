const { Router } = require('express');
const Course = require('../models/course.js');
const ObjectID = require('mongodb').ObjectID; 

const router = Router();

const getId = (id) => {
  return new ObjectID(id);
}

router.get('/', async (req, res) => {
  const courseList = await Course.find();

  res.render('courses', {
    title: 'Курсы',
    isCourses: true,
    courseList
  })
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
  
  const id = getId(req.params.id)

  const course = await Course.findById(id);
  res.render('course-edit', {
    title: course.title,
    price: course.price,
    img: course.img,
    id: course.id
  })
});

router.post('/edit', async (req, res) => {
  const { id } = req.body;
  delete id;
  await Course.findOneAndUpdate(id, req.body);
  res.redirect('/courses');
});

router.post('/remove', async (req, res) => {
  await Course.deleteOne({
    _id: req.body.id
  })
  res.redirect("/courses");
});

router.get('/:id', async (req, res) => {
  console.log('ID', req.params.id);
  const id = getId(req.params.id)
  const course = await Course.findById(id);
  res.render('course', {
    layout: 'empty',
    title: course.title,
    price: course.price,
    img: course.img
  });
});

module.exports = router