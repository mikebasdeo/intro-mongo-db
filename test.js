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
})

// create a model
const Student = mongoose.model('student', student)

//inserts and queries

// connect to the database -> add stuff to the student collection and
// retrieve it
connect()
  .then(async (connection) => {
    const student = await Student.create({ firstName: 'Mike' })
    const find = await student.find({ firstName: 'Randy' })
    const findById = await student.findById({ firstName: '5c0923cnnbcn' })
    const updated = await student.findByIdAndUpdate('asda', {})
  })
  .catch((e) => console.error(e))
