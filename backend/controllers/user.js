const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');



exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username:req.body.username,
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {
            if (error.code === 11000) {
                res.status(400).json({ error: 'L\'adresse e-mail est déjà utilisée.' });
            } else {
                res.status(400).json({ error });
            }
        });
    })
    .catch(error => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
    console.log('Received login request:', req.body);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                console.log('User not found for email:', req.body.email);
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            console.log(user);
            console.log(req.body.password)
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log('Invalid password for user', user.email);
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    const token = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    );
                    console.log('Login successful, token generated for user:', user.email);
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                })
                .catch(error => {
                    console.error('Error comparing password:', error);
                    res.status(500).json({ message: 'Internal server error', error });
                });
        })
        .catch(error => {
            console.error('Error finding user:', error);
            res.status(500).json({ message: 'Internal server error', error });
        });
};


