const mongoose = require("mongoose");

if (mongoose.models.TestQuestion) {
  delete mongoose.models.TestQuestion;
}
// 중복방지
// < -- > 
const QuestionSchema = new mongoose.Schema({
    field : { type : String, requied : true},
    language: { type : String},
    difficulty: {type : Number},
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: Number, required: true } 
});

module.exports = mongoose.model("TestQuestion",QuestionSchema);