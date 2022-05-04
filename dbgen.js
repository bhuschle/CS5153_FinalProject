const fs = require("fs");

let f = fs.readFileSync(process.argv[2], 'utf8', (error, data) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(data);
});

f = f.split(/\r?\n/).map(line => line.split('\t'));

let s = "";
let numberValueCols = [];
for (let i = 0; i < f.length; i += 1) {
    let l = f[i].join(", ");
    if (i === 0) {
        numberValueCols.push(f[i].indexOf("price"));
        numberValueCols.push(f[i].indexOf("sold_count"));
        s += `INSERT INTO tables (${l}) VALUES\n`;
    }
    else {
        s += "("
        for (let j = 0; j < f[i].length; j += 1) {
            if (numberValueCols.includes(j)) {
                s += f[i][j];
            }
            else {
                s += `'${f[i][j]}'`;
            }

            if (j !== f[i].length - 1) {
                s += ", ";
            }
        }
        s += ")"
        if (i !== f.length - 1) {
            s += ",\n";
        }
    }
}

s += ";"

console.log(s);
