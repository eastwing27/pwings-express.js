const fs = require('fs');
const { cachedDataVersionTag } = require('v8');

module.exports.getConfig = () => {
    try {
        const file = fs.readFileSync(`${__dirname}/../config.json`, 'utf8');
        return JSON.parse(file);
    }
    catch(err){
        console.error(err);
    }
}