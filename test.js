var fs = require('fs');

let text = fs.readFileSync('codefile.js').toString();

let literals = [];
while (true) {
    var result = text.match(/`([^`]+)`/);
    if (!result)
        break;
    let literalKey = 'TEMPLATE_LITERAL_STR'+literals.length;
    literals.push(result[0]);
    text = text.replace(result[0], literalKey);
}

console.log(text);
for(let i=0;i<literals.length; i++){
    text = text.replace('TEMPLATE_LITERAL_STR'+i, literals[i]);
}
//console.log(text);