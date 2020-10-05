import mongoose from 'mongoose';

const mongoURL = "mongodb+srv://squuze5:qwerty123@cluster0.lzwq6.mongodb.net/rubygarage";
mongoose.Promise = Promise;

mongoose.connect(mongoURL || 'mongodb://127.0.0.1:27017/rubygarage', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export { db, mongoose };
