import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    classname: {
        type: String,
        required: true,
        unique:true
    },
    subject: {
        type: [
            {
                subname: {
                    type: String,
                    required: true
                },
                PA1: {
                    type: Number,
                    default: 0,
                },
                PA2: {
                    type: Number,
                    default: 0,
                },
                PA3: {
                    type: Number,
                    default: 0,
                },
                halfYearly: {
                    type: Number,
                    default: 0,
                },
                annual: {
                    type: Number,
                    default: 0,
                },

            }
        ]
    },
})


export const Subject = mongoose.models.subjects || mongoose.model("subjects", subjectSchema)