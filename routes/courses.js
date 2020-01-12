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
  const { title, price, img } = course;
  res.render('course-edit', {
    title,
    price,
    img
  })
});

router.post('/edit', async (req, res) => {
  console.log(req);
  const { id } = req.body;
  await Course.findOneAndUpdate(id, req.body);
  res.redirect('/courses');
})

router.get('/:id', async (req, res) => {
  const id = getId(req.params.id)
  const course = await Course.findById(id);
  res.render('course', {
    layout: 'empty',
    ...course
  });
})

module.exports = router