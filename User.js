const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
})

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 120,
    validate: {
      validator: (v) => v % 2 !== 0,
      message: (props) => `${props.value} is not odd number`,
    },
  },
  email: { type: String, required: true, lowercase: true }, //Способ сделать email обязательным
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  hobbies: [String],
  address: addressSchema,
})

userSchema.methods.sayHi = function () {
  console.log(`Hi. My name is ${this.name}`)
}

userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") })
}

userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") })
}

userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`
})

/**
 * Middleware
 */

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

userSchema.post("save", function (doc, next) {
  doc.sayHi()
  next()
})

module.exports = mongoose.model("User", userSchema)
