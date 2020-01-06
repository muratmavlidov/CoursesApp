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

module.exports = router