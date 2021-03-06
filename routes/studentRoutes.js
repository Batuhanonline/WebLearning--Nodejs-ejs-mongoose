const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')


router.get('/:id', studentController.student_index_get)

//---------------------Lesson Content URL-------------------------
router.get('/:id/dersicerikleri', studentController.student_lessons_get)

router.get('/:id/:lesson/dersdetayi', studentController.student_lesson_detail_get)

//---------------------Test Lesson Content URL-------------------------
router.get('/:id/test', studentController.student_tests_get)

router.get('/:id/:test/test', studentController.questions_get)
router.post('/:id/:test/test', studentController.questions_post)

//---------------------Video Lesson Content URL-------------------------
router.get('/:id/video', studentController.student_videos_get)
router.get('/:id/:videolessonid/videodersi', studentController.student_videolesson_detail_get)

//---------------------Game Lesson Content URL-------------------------
router.get('/:id/oyunlar', studentController.student_games_get)
router.post('/:id/oyunlar', studentController.student_games_post)

router.get('/:id/:lesson/oyundersi', studentController.student_game_detail_get)
router.post('/:id/:lesson/oyundersi', studentController.student_game_detail_post)

router.get('/:id/:lesson/oyunskoru', studentController.student_gamescore_detail_get)


//---------------------Google Form URL-------------------------
router.get('/:id/derssonrasianket', studentController.lessonafterform_get)
router.get('/:id/pekistirmesonrasianket', studentController.reinforcementafterform_get)
router.get('/:id/egitimsonrasianket', studentController.evaluationform_get)








module.exports = router