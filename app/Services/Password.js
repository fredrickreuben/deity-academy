
var generator = require('generate-password');

class Password{

    async generate(){
        var password = generator.generate({
            length: 10,
            numbers: true
        });

        return password
    }

}

module.exports = new Password()