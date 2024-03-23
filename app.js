
// async function fetchData(url){
//     try {
//         const Request = await fetch(url);
//         const Response = await Request.json();

//         let points = Response.points.total
//         console.log(points)
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// fetchData('https://teamtreehouse.com/profiles/brandondurand.json');

const https = require('https');
const http = require('http');

function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

function printError(error) {
    console.error(error.message);
}

function getProfile(username){
    try {
        const Request = https.get(`https://teamtreehouse.com/profiles/${username}.json`, (res) => {
            if(res.statusCode === 200){
                let body = "";
                res.on('data', (data)=> {
                    body += data.toString();
                })
                res.on('end', ()=> {
                    try {
                        let parsedBody = JSON.parse(body);
                        printMessage(parsedBody.name, parsedBody.badges.length, parsedBody.points.total)
                    } catch (error) {
                        printError(error)
                    }

                })
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[res.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        })
        Request.on('error', (error)=> {
            printError(error)
        })
    } catch (error) {
        printError(error)
    }
}

const users = process.argv.slice(2)
users.forEach(getProfile)