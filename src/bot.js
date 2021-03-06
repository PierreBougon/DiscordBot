var Discord = require('discord.js');
const client = new Discord.Client();
const token = 'MjM2NDk3NjQ4Nzg0Mzc1ODA4.CuJ_WA.CN0_uhE1Sm4EDjn9mlHVB9oqPSw';
const helpDialog = "Help:\n\n\
d[valueMax]\t\t\t\t\t\t\t   \
Roll the dice for the value\nsetGoal[valueMax]\t\t\t\t  \
Set the next goal to your next rolling\nsetBonus[value]\t\t\t\t\t\t\
Set the next bonus value\nsetMalus[value]\t\t\t\t\t\t\
Set the next malus value\n";

var goal = -1;
var malus = 0;
var bonus = 0;

client.on('ready', () =>
{
    console.log("Connected as: " + client.user.username);
});

client.on('message', message =>
{
    message.content = message.content.toUpperCase();
    if (message.author == client.user || message.content.indexOf(" ") > -1)
        return;

    if (message.content[0] == 'D')
        rollTheDice(message);
    else if (message.content == "HELP")
        message.channel.sendMessage(helpDialog);
    else if (message.content.substr(0, 7) == "SETGOAL")
        setGoal(message);
    else if (message.content.substr(0, 8) == "SETBONUS")
        setBonus(message);
    else if (message.content.substr(0, 8) == "SETMALUS")
        setMalus(message);
    else if (message.content == "STATE")
        printState(message);
});

function printState(message)
{
    message.channel.sendMessage("State:\n\nGoal = " + goal + "\nBonus = " + bonus + "\nMalus = " + malus);
}

function setGoal(message)
{
    goal = parseInt(message.content.substr(7));
    if (isNaN(goal))
        goal = -1;
}

function setBonus(message)
{
    bonus = parseInt(message.content.substr(8));
    if (isNaN(bonus))
        bonus = 0;
}

function setMalus(message)
{
    malus = parseInt(message.content.substr(8));
    if (isNaN(malus))
        malus = 0;
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function rollTheDice(message)
{
    var messageRepply;
    var valueDice = parseInt(message.content.substr(1));
    if (isNaN(valueDice))
        return;
    var result = getRandomInt(0, valueDice);
    goal = goal + bonus - malus;
    messageRepply = "\nYou rolled the dice:  " + result;
    console.log(messageRepply);
    if (goal > -1)
    {
        messageRepply += "\nYou had to roll under " + goal + "\n\n";
        if (result <= goal + bonus - malus)
            messageRepply += "Nice you reached the goal !";
        else
            messageRepply += "You failed !";
        console.log(messageRepply);
  }
  message.reply(messageRepply);
  resetValues();
}

function resetValues()
{
    goal = -1;
    bonus = 0;
    malus = 0;
}

client.login(token);
