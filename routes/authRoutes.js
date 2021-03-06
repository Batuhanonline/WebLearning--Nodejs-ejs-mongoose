const router = require('express').Router()
const authController = require('../controllers/authController')


router.get('/', authController.index_get)
router.post('/', authController.index_post)
router.get('/adminlogin', authController.login_get)
router.post('/adminlogin', authController.login_post)
router.get('/ogretmengiris', authController.teacher_login_get)
router.post('/ogretmengiris', authController.teacher_login_post)
router.get('/akademigiris', authController.academy_login_get)
router.post('/akademigiris', authController.academy_login_post)
router.get('/ogrencigiris', authController.student_login_get)
router.post('/ogrencigiris', authController.student_login_post)
router.get('/logout', authController.logout_get)


module.exports = router