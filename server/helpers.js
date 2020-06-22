const fs = require("fs");
const path = require("path");

const findUserInDB = user => {
    const usersString = fs.readFileSync(path.resolve("./data/users.json"));
    const users = JSON.parse(usersString);
    
    const matchingUser = Object.keys(users).find(userId => {
        return users[userId]
         && users[userId].username === user.username
         && users[userId].password === user.password;
    });

    if (matchingUser) {
        return users[matchingUser];
    }

    return null;
}

const findUserById = user => {
    const usersString = fs.readFileSync(path.resolve("./data/users.json"));
    const users = JSON.parse(usersString);
    
    const matchingUser = users[user.id]

    console.log({matchingUser});

    if (matchingUser) {
        return matchingUser;
    }

    return null;
}

module.exports = {findUserInDB, findUserById};