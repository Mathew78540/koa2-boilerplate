import mongoose, { Schema } from 'mongoose';
import Promise from 'bluebird';
import mongooseTimestamp from 'mongoose-timestamp';
import mongoosePaginate from 'mongoose-paginate';
import mongooseUniqueValidator from 'mongoose-unique-validator';

// Schema
const userSchema = new Schema({
});

// Plugins
userSchema.plugin(mongooseUniqueValidator);
userSchema.plugin(mongooseTimestamp);
userSchema.plugin(mongoosePaginate);

// Model
const model = mongoose.model('User', userSchema);
Promise.promisifyAll(model);
Promise.promisifyAll(model.prototype);

export default model;
