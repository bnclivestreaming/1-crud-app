import mongoose, { SchemaTypes, Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: SchemaTypes.String },
  email: { type: SchemaTypes.String },
  password: { type: SchemaTypes.String },
});

export default model('User', UserSchema);
