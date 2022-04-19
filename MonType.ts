import mongoose from 'mongoose';

export interface TaskSchema {
  title: string;
  description: string;
  reminder: boolean;
  datetime: string;
  link: string;
  tag: string;
  priority: string;
  isCompleted: boolean;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Schema.Types.ObjectId;
  id: string;
};

export interface UserSchema {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  fullname: string;
  tags: string[];
  token: string;
  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Schema.Types.ObjectId;
  id: string;
};
