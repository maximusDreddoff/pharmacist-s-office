
var App = function () {
    this.users = [];
    this.usersTable = $('#users-table');
    this.userRowTemplate = $('#template-user-row').html();
    this.userFormRowTemplate = $('#template-user-form-row').html();
    this.addUserButton = $('#js-add-user-button');

    this.initialize();
};

App.prototype.initialize = function () {
    this.users = User.prototype.findAll();
    this.renderUsersTable();

    this.bindHandlers();
};

App.prototype.renderUsersTable = function () {
    for (var index in this.users) {
        this.addUserRow(this.users[index]);
    }
};

App.prototype.bindHandlers = function () {
    var self = this;
    this.addUserButton.click(function () {
        self.showUserFormRow();
    });
};

App.prototype.addUserRow = function (user, $insteadOf) {
    var self = this;
    var usersRow = self.renderTemplate(
        this.userRowTemplate,
        [
            '{id}',
            '{firstName}',
            '{lastName}',
            '{dateOfBirth}',
            '{address}',
            '{phone}',
            '{email}',
            '{leftEye}',
            '{rightEye}'
        ],
        [
            user.id,
            user.firstName,
            user.lastName,
            user.dateOfBirth,
            user.address,
            user.phone,
            user.email,
            user.leftEye,
            user.rightEye
        ]

    );
    !$insteadOf ? this.usersTable.append(usersRow) : $insteadOf.replaceWith(usersRow);
    $(usersRow).find('.js-edit-user-button').click(function () {
        self.showUserFormRow($(this).parents('tr'));
    })
};

App.prototype.showUserFormRow = function ($insteadOfTr) {
    var self = this;
    var userToEdit = null;
    if ($insteadOfTr) {
        userToEdit = User.prototype.findOne({id: $insteadOfTr.data('id')});
    }
    var toReplace = [
        '{id}',
        '{firstName}',
        '{lastName}',
        '{dateOfBirth}',
        '{address}',
        '{phone}',
        '{email}',
        '{leftEye}',
        '{rightEye}'
    ];
    var replaceWith = !userToEdit
        ? new Array(toReplace.length).join('0').split('0') //if form is to add user then we replace everything with ''
        :
        [
            userToEdit.id,
            userToEdit.firstName,
            userToEdit.lastName,
            userToEdit.dateOfBirth,
            userToEdit.address,
            userToEdit.phone,
            userToEdit.email,
            userToEdit.leftEye,
            userToEdit.rightEye
        ];
    var $formElement = self.renderTemplate(this.userFormRowTemplate, toReplace, replaceWith);
    $formElement.find('.js-save-user-button').click(function () {
        var user = new User({
            firstName: $formElement.find('.firstName').val(),
            lastName: $formElement.find('.lastName').val(),
            dateOfBirth: $formElement.find('.dateOfBirth').val(),
            address: $formElement.find('.address').val(),
            phone: $formElement.find('.phone').val(),
            email: $formElement.find('.email').val(),
            leftEye: $formElement.find('.leftEye').val(),
            rightEye: $formElement.find('.rightEye').val()
        });
        user.save();
        self.addUserRow(user, $formElement);
    });
    !$insteadOfTr ? this.usersTable.append($formElement) : $insteadOfTr.replaceWith($formElement);
};

App.prototype.renderTemplate = function (templateText, toReplace, replaceWith) {
    return $(templateText.replaceArray(toReplace, replaceWith));
};