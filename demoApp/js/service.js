demoApp.factory('terryCustomersService', function () {
    var customers = [
        { "name": "Andy" },
        { "name": "Ailly" },
        { "name": "Betty" },
        { "name": "Chirs" },
        { "name": "Derek" },
        { "name": "Dorian" },
        { "name": "Erica" },
        { "name": "Gino" },
        { "name": "Liang" },
        { "name": "Miki" },
        { "name": "Nia" },
        { "name": "Black" },
        { "name": "Stoner" },
        { "name": "Terry" },
        { "name": "Zizi" },
        { "name": "Erin" },
        { "name": "Ike" }

    ];
    return {
        all: function () {
            return customers;
        }
    }
});