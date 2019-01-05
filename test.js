const inq = require('inquirer');

let ids = ['1','2','3','4','5','6','7','8','9','10'];

inq.prompt([
    {
        type: 'list',
        message: 'For here or to go?',
        choices: ids,
        name: 'hereOrGo'
    },
    {
        type: 'input',
        message: 'What is your name?',
        name: 'username'
    }
])
.then(function (response) {
    console.log('Thanks for choosing Roadkill Burgers, you kill \'em, we grill \'em!');
})