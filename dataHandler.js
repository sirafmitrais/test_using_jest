const fs = require('fs');

fs.readFile('./data_people.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`error reading file from directory`)
    }
    else{
        const database = JSON.parse(data);
    }

})