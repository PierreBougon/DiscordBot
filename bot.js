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
var Malus = -1;
var Bonus = -1;

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
  else if (message.content == "setGoal")
    setGoal(message);
});

function setGoal(message)
{
  goal = parseInt(message.content.substr(7));
  if (goal == NaN)
    goal = -1;
}

function getRandomInt(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function rollTheDice(message)
{
  var valueDice = parseInt(message.content.substr(1));
  if (isNaN(valueDice))
    return;
  message.reply("You rolled the dice: " + getRandomInt(0, valueDice));
}

client.login(token);
