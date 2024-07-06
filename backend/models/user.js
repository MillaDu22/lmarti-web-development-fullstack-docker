const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    });

    // Méthode pour comparer les mots de passe //
    userSchema.methods.comparePassword = async function(candidatePassword) {
        try {
            const match = await bcrypt.compare(candidatePassword, this.password);
            return match;
        } catch (error) {
            throw new Error(error);
        }
    };

    // Middleware pour hacher le mot de passe avant de l'enregistrer dans la base de données //
    /*userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
        return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});*/

const User = mongoose.model('User', userSchema);

module.exports = User;
