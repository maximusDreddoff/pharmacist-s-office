
User.prototype = new ActiveRecord('User');
User.prototype.constructor = User;
function User(properties) {
    this.firstName = '';
    this.lastName = '';
    this.dateOfBirth = '';
    this.address = '';
    this.phone = '';
    this.email = '';
    this.leftEye = '';
    this.rightEye = '';

    this.fillWithProperties(properties);
}