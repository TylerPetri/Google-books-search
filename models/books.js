const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    authors: [
        {
            name: {
                type: String,
                trim: true
            }
        }
    ],
    description: {
        type: String
    },
    image: {
        type: String
    },
    link: {
        type: String
    },
    username: {
        type: String
    }
})

const Books = mongoose.model("Books", UserSchema)

module.exports = Books