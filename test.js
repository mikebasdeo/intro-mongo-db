const mongoose = require('mongoose')

let url = 'mongodb://localhost:27017/myDatabase'

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
  })
}

// create a schema
const student = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  faveFoods: [{ type: String }],
  info: {
    school: {
      type: String,
    },
    shoeSize: {
      type: Number,
    },
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'school',
  },
})

// School Schema
const school = new mongoose.Schema({
  name: String,
  openSince: Number,
  students: Number,
  isGreat: Boolean,
  staff: [{ type: String }],
})

// create a model
const School = mongoose.model('school', school)
const Student = mongoose.model('student', student)

//inserts and queries

// connect to the database -> add stuff to the student collection and
// retrieve it
connect()
  .then(async (connection) => {
    const school1 = {
      name: 'String',
      openSince: 3,
      students: 3,
      isGreat: true,
      staff: ['a', 'b', 'c'],
    }

    const school2 = {
      name: 'String2',
      openSince: 6,
      students: 6,
      isGreat: false,
      staff: ['v', 'b', 'g'],
    }

    const schools = await School.create([school1, school2])

    // const match = await School.findOne({
    //   students: { $gt: 4, $lt: 3},
    //   isGreat: false,
    // })

    // sneaky list search
    // const match = await School.find({
    //   staff: 'b',
    // })

    const match = await School.find({
      $in: { staff: ['v', 'b', 'g'] },
    })
      .sort({ openSince: 1 })
      .limit(2)
      .exec()

    console.log(match)
    // const school = await School.create({ name: 'Wilkinson' })

    // const student = await Student.create({
    //   firstName: 'Steve',
    //   school: school._id,
    // })

    // const match = await Student.findById(student.id).populate('school').exec()
    // Archive:
    // const mike = await Student.findOne({ firstName: 'Mike' }).exec()
    // const student = await Student.create({ firstName: 'Mike' })
    // const find = await student.find({ firstName: 'Randy' })
    // const findById = await student.findById({ firstName: '5c0923cnnbcn' })
    // const updated = await student.findByIdAndUpdate('asda', {})
  })
  .catch((e) => console.error(e))
