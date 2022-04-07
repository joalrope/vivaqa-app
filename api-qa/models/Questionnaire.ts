import { Schema, model } from 'mongoose';

interface IQa {
  code: string;
  title: string;
  category: string;
}

const qaSchema = new Schema<IQa>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

qaSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  const id = _id;
  const key = _id;
  return { id, key, ...object };
});

export const Qa = model<IQa>('Qa', qaSchema);
