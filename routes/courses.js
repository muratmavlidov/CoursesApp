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
  
  const id = `'${req.params.id}'`
  const course = await Course.findById(id);
  res.render('course-edit', {
    ...course
  })
});

router.post('/edit', async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Course.findOneAndUpdate(id, req.body);
  res.redirect('/courses');
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render('course', {
    layout: 'empty',
    ...course
  });
})

module.exports = router