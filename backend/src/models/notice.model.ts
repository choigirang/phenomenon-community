import mongoose, { Schema } from 'mongoose';
import { Notice } from '../../type/type';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  noticeNumber: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Notice = mongoose.model<Notice>('Notice', noticeSchema);

export default Notice;
