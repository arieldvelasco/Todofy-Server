import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userMail: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;