const { Schema, model } = require('mongoose');
const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegex,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true });
  
const signupSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
});

const verificationEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
})

const schemas = {
  signupSchema,
  verificationEmailSchema
}

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};