import mongoose from 'mongoose';

const SubscribeSchema = new mongoose.Schema({
  number: { type: Number, required: true },
});
export default mongoose.model('Subscribe', SubscribeSchema);
