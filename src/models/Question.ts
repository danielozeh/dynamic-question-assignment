import mongoose, { Schema, Document } from 'mongoose';

interface IQuestion extends Document {
  content: string;
}

const QuestionSchema: Schema = new Schema({
  content: { type: String, required: true },
});

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;
