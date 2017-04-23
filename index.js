// Forth interperter
const prompt = require("prompt");

const dict = {};
dict.docol = docol;
dict.bye = bye;

let input = "";
let stack = [];

prompt.message = "ForthJS";
// prompt.delimiter = " ";
prompt.colors = false;

prompt.start();
docol();

function onErr(err) {
    console.log(err);
    return 1;
}

function docol() {
    console.log("OK");
    prompt.get([{
        name: "input",
        description: "=>",
        type: "string",
    }], function (err, result) {
        if (err) { return onErr(err); }
        input = result.input;
        evalInput();
    });
}

function evalInput() {
    const words = input.trim().split(" ");
    for (let w of words) {
        if (typeof(dict[w]) !== "undefined") {
            dict[w]();
        } else {
            const int = parseInt(w);
            // console.log(`w: ${w}, int: ${int}`);
            if (!isNaN(int)) {
                stack.push(int);
            } else { 
                console.log(`Invalid entry: ${w}`);
                break;
            }
        }
    }
    return docol();
}

function bye() {
    process.exit();
}
