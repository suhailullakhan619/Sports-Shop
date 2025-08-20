// server/AddUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/sports-shop', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const createUser = async () => {
  const hashedPassword = await bcrypt.hash('Jawahar7', 10);
  const user = new User({
    username: 'Jawahar_in',
    password: hashedPassword,
  });

  await user.save();
  console.log('✅ User created');
  mongoose.disconnect();
};

createUser();
