const { Router } = require('express');
const Course = require('../models/course.js');
const router = Router();

router.get('/', async (req, res) => {

  const courseList = await Course.getAll();

  res.render('courses', {
    title: 'Курсы',
    isCourses: true,
    courseList
  })
});

router.get('/:id', async (req, res) => {
  const course = await Course.getCourse(req.params.id);
  res.render('course', {
    layout: 'empty',
    ...course
  });
})

module.exports = router