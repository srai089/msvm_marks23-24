import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    unique: true,
    required: true,
  },
  class:{
    type:String,
    required:true
  },
  exams: {
    pa1: {
      type: [
        {
          subject: {
            type: String,
            required: true,
          },
          score: {
            type: Number,
            default:null
          },
        },
      ],
      default: [],
    },
    pa2: {
        type: [
          {
            subject: {
              type: String,
              enum: ['Hindi', 'English', 'Science', 'Social Science', 'Maths'],
              required: true,
            },
            score: {
              type: Number,
              default:null
            },
          },
        ],
        default: [],
      },
      pa3: {
        type: [
          {
            subject: {
              type: String,
              enum: ['Hindi', 'English', 'Science', 'Social Science', 'Maths'],
              required: true,
            },
            score: {
              type: Number,
              default:null
            },
          },
        ],
        default: [],
      },
    halfYearly: {
      type: [
        {
          subject: {
            type: String,
            enum: ['Hindi', 'English', 'Science', 'Social Science', 'Maths'],
            required: true,
          },
          score: {
            type: Number,
            default:null
          },
        },
      ],
      default: [],
    },
    annual: {
      type: [
        {
          subject: {
            type: String,
            enum: ['Hindi', 'English', 'Science', 'Social Science', 'Maths'],
            required: true,
          },
          score: {
            type: Number,
           default:null
          },
        },
      ],
      default: [],
    },
  },
  totalMarks: {
    type: Number,
    default: 0,
  },
});


export const Student = mongoose.models.students || mongoose.model('students', studentSchema);