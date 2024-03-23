const https = require('https');
const http = require('http');

function printError(error){
    console.log(error.message, error.code);
}

function getFacts(term){
    try {
        const Request = https.get('https://dictionaryapi.com/api/v3/references/learners/json/test?key=abf861a5-9343-403c-aff2-634c61962a47', (res)=> {
            if(res.statusCode === 200){
                let body = '';
                res.on('data', (data)=>{
                    body += data.toString();
                })
                res.on('end', ()=>{
                    try {
                        let parsedBody = JSON.parse(body);
                        parsedBody.forEach(element => {
                            if(element.meta.id == term){
                                console.log("Definitions:")
                                element.meta["app-shortdef"].def.forEach( def => {
                                    console.log(def);
                                })
                            }
                        });
                    } catch (error) {
                        printError(error)
                    }
                })
            } else {
                printError(new Error('Something went wrong'));
            }
        })
        Request.on('error', (error)=>{
            printError(error)
        })
    } catch (error) {
        printError(error)
    }
}

const word = process.argv.slice(2);
word.forEach(getFacts)