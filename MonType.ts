import mongoose from 'mongoose';

export interface TaskSchema {
  title: string;
  description: string;
  notification: boolean;
  datetime: string;
  link: string;
  location: string;
  tags: string[];
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
  token: string;
  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Schema.Types.ObjectId;
  id: string;
};
