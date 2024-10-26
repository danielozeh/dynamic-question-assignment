import mongoose, { Document, Schema } from 'mongoose';

interface ICycleAssignment extends Document {
  region: string;
  questionId: mongoose.Types.ObjectId;
  cycle: number;
}

const CycleAssignmentSchema: Schema = new Schema({
  region: { type: String, required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  cycle: { type: Number, required: true },
});

const CycleAssignment = mongoose.model<ICycleAssignment>('CycleAssignment', CycleAssignmentSchema);

export default CycleAssignment;
