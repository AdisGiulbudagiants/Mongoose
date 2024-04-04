const mongoose = require("mongoose")
const User = require("./User.js")

mongoose.connect("mongodb://localhost/appdb")

async function run() {
  try {
    const user = await User.findOne({
      name: "Adis",
      email: "adisforwork2001@gmail.com",
    })
    console.log(user)
    await user.save()
    console.log(user)
  } catch (e) {
    console.error(e.message)
  }
}

run()
