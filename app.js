const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const dbURL = require('./config/db')

const teacherRoutes = require('./routes/teacherRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const academyRoutes = require('./routes/academyRoutes')
const studentRoutes = require('./routes/studentRoutes')

const { requireAuthAdmin, checkAdmin } = require('./middlewares/adminAuthMiddleware')
const { requireAuthAcademy, checkAcademy } = require('./middlewares/academyAuthMiddleware')
const { requireAuthTeacher, checkTeacher } = require('./middlewares/teacherAuthMiddleware')
const { requireAuthStudent, checkStudent } = require('./middlewares/studentAuthMiddleware')

const app = express()
app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(bodyParser.json())


mongoose.connect(dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => app.listen(3000))
.catch((err) => console.log(err))


app.use('/',authRoutes)
app.use('/akademi', requireAuthAcademy, checkAcademy, academyRoutes)
app.use('/ogretmen',requireAuthTeacher, checkTeacher, teacherRoutes)
app.use('/ogrenci', requireAuthStudent, checkStudent, studentRoutes)
app.use('/admin', requireAuthAdmin, checkAdmin, adminRoutes)




