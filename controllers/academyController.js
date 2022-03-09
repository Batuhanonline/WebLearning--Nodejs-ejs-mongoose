const Academy =  require('../models/academy')
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

const academy_index_get = (req,res) => {
    Student.find().sort({ createdAt: -1 })
        .then((result) => {
            const student = result
            Teacher.find().sort({ createdAt: -1 })
                .then((result) => {
                    res.render('academyindex',{title: 'Akademi-Anasayfa', teachers: result, students: student})
                })
                .catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })

    
}

const academy_teachers_get = (req, res) => {
    Teacher.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('academyteachers', { title: 'Akademi-Öğretmenler', teachers:result })
        })
        .catch((err) => {
            console.log(err)
        })
}

const academy_students_get = (req, res) => {
    Student.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('academystudents', { title: 'Akademi-Öğrenciler', students: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

const academy_student_info_get = (req, res) => {
    const studentID = req.params.student
    console.log(studentID)
    Student.findById(studentID)
        .then((result) => {
            const student = result
            Teacher.find().sort({ createdAt: -1 })
                .then((result) => {
                    res.render('academystudentinfo',{title: 'Akademi-Öğrenci Bilgi', teachers: result, student: student})
                })
                .catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })
}

const academy_student_info_post = (req, res) => {
    const { selectTeacherID, deleteTeacher} = req.body
    const studentID = req.params.student
    
    
    if (selectTeacherID) {
        Student.updateOne({ id: studentID }, {$push: {teachers: {teacherID: selectTeacherID}}})
        .then((result) => {
            res.redirect('back')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    if (deleteTeacher) {
        Student.updateOne({ id:studentID }, {$pull: {teachers: {teacherID: deleteTeacher}}})
        .then((result) => {
            res.redirect('back')
        })    
        .catch((err) => {
            console.log(err)
        })
    }
    
}

const academy_teacher_add_get = (req,res) => {
    res.render('teacheradd',{title: 'Akademi-Öğretmen Ekle'})
}

const academy_teacher_add_post = (req,res) => {
    const teacher = new Teacher(req.body)
    teacher.save()
        .then((result) => {
            res.redirect('/akademi')
        }).catch((err) => {
            console.log(err)
        })
}

const academy_student_add_get = (req, res) => {
    res.render('studentadd', { title: 'Akademi- Öğrenci Ekle'})
}

const academy_student_add_post = (req, res) => {
    console.log(req.body)
    const student = new Student(req.body)
    student.save()
        .then((result) => {
            res.redirect('/akademi')
        }).catch((err) => {
            console.log(err)
        })
}


module.exports = {
    academy_index_get,
    academy_teacher_add_get,
    academy_teacher_add_post,
    academy_student_add_get,
    academy_student_add_post,
    academy_student_info_get,
    academy_student_info_post,
    academy_students_get,
    academy_teachers_get
}