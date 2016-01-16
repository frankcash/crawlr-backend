let mongoose = require('mongoose');
let validator = require('validator');
let crypto = require('crypto');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Create instance method for hashing a password
 * @param: {String} password
 */
UserSchema.method('hashPassword', function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
});

/**
 * Create instance method for authenticating user
 * @param: {String} password
 */
UserSchema.method('authenticate', function(password) {
    return this.password === this.hashPassword(password);
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
