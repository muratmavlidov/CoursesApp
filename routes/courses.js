const { Router } = require('express');
const Course = require('../models/course.js');

const router = Router();

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
  
  const course = await Course.findById(req.params.id);

  res.render('course-edit', {
    title: `Редактировать ${course.title}`,
    ...course
  })
});

router.post('/edit', async (req, res) => {
  const { _id } = req.body;
  delete req.body._id;
  await Course.findByIdAndUpdate(_id, req.body);
  res.redirect('/courses');
})

router.get('/:id', async (req, res) => {
  const course = await Course.getCourse(req.params.id);
  res.render('course', {
    layout: 'empty',
    ...course
  });
})

module.exports = router