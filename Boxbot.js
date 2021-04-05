const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

function findDice(input,rolltype){
	var dLoc = new Array()
	for (i = 0; i<input.length; i++)
	{ if (input[i] === rolltype) {dLoc.push(i)}
		}
//console.log(dLoc);
	return dLoc;
}

function dicetypes(input,dLoc){
var diceTypes = new Array()
for (i = 0; i<dLoc.length; i++)
{	var nextPlus
	if (input.indexOf("+",dLoc[i])>0){ nextPlus = input.indexOf("+",dLoc[i])}
else {nextPlus = input.length};
if (input.indexOf("-",dLoc[i])>0){ nextMinus = input.indexOf("-",dLoc[i])}
else {nextMinus = input.length};
var nextSymbol = Math.min(nextPlus,nextMinus)
	diceTypes.push(input.slice((dLoc[i]+1), nextSymbol))}
//console.log(diceTypes);
return diceTypes;
}

function diceNumbers(input,dLoc){
	var diceNumbers = new Array()
	for (i = 0; i<dLoc.length; i++)
	{var lastSymbol
		 if (input.lastIndexOf("+",dLoc[i])>0){ lastSymbol = (input.lastIndexOf("+",dLoc[i])+1)}
	else {lastSymbol = 0};
		diceNumbers.push(input.slice(lastSymbol, (dLoc[i])));
	}
	if (diceNumbers[0] == ''){console.log("No dice numbers found")
		diceNumbers[0]=1}
	return diceNumbers;
}

function dx(dicenumbers,dicetypes){
let rollednumbers = new Array()
for (i=0; i<dicetypes.length; i++){
	for (j=0; j<dicenumbers[i]; j++){
	rollednumbers.push(Math.floor((Math.random() * dicetypes[i]) + 1))
	}
}
//console.log(rollednumbers)
return rollednumbers
}

function modifiers(input) {
var input
var lastdice = input.lastIndexOf("d")
var lastPlus = input.indexOf("+",lastdice)
var lastMinus = input.indexOf("-",lastdice)
var lastOp
if ((lastPlus == "-1") || (lastMinus == "-1")) {lastOp = Math.max(lastPlus,lastMinus)}
else lastOp = Math.min(lastPlus,lastMinus)
var modtext = input.slice(lastOp,input.length)
/*
console.log(lastdice)
console.log(lastPlus)
console.log(lastMinus)
console.log(lastOp)
console.log(modtext)
*/
if ((input.search(/[^a-zA-Z\d\s:]/))>-1){
	if (lastOp>lastdice){
return modtext
} else return ""
} else return ""
}

function checkBotch(botchrolls){
var botches = 0;
	for (i=0;i<botchrolls.length;i++)
	{
		if (botchrolls[i]==10)
		{botches++};
	}
	return botches
}

function rollD10()
{roll = Math.floor((Math.random() * 10) + 1)
	return roll}

function stressRoll(message){
var i = 0
var roll = rollD10()
console.log(roll)
var explode =	checkroll(roll)
	function checkroll(roll){ if (roll == 10){roll = 0
	message.channel.send("**Uh oh, check for Botch!**")}
		while (roll == 1){
		message.channel.send(message.member.displayName + " rolls a " + roll + " and it **explodes!**")
			i++
			roll = rollD10()
			message.channel.send(message.member.displayName + " rolls a " + roll)
			console.log("Exploding" + roll)
		}
		return roll
	}
finalroll = (explode*(Math.pow(2,i)))
return finalroll
}

function rolltype(input,message){
	if (input.includes("d")){
	var rolls = dx(diceNumbers(input, findDice(input,"d")),dicetypes(input,findDice(input,"d")));
	var diceTotal = +rolls.reduce(totalDice);
	var mods = modifiers(input).replace(/[^-()\d/*+.]/g, '')
	var mod = eval(0+mods)
	//console.log(mod);
	message.channel.send(message.member.displayName + " rolls [" + rolls + "]\n[Result] = " + (diceTotal+mod))

	function totalDice(a,b){
		return a+b
	}
	}
	else 	if (input.includes("b")){
			var botchrolls = dx(diceNumbers(input, findDice(input,"b")),[10]);
			var botches = checkBotch(botchrolls);
			var botchresult
			switch (botches) {
				case 0: botchresult = "*Not a Botch!*";
				break;
				case 1: botchresult = "1 **Botch!**";
				break;
				default:  botchresult = (botches + " **Botches!**");
			}
			message.channel.send(message.member.displayName + " rolls [" + botchrolls + "] \n[Result] = " + botchresult )
			if (input.includes("w")){
				var weirdDie = rollD10()
				if (weirdDie == 10) {message.channel.send("Weird roll [0]: **A Weird Botch occurs!**")}
				else {message.channel.send("Weird roll ["+ weirdDie +"]: *Not a Botch!*")}
			}
		}
		else 	if (input.includes("s")){
		var rolls = stressRoll(message)
		var mods = modifiers(input).replace(/[^-()\d/*+.]/g, '')
		var mod = eval(0+mods)
		message.channel.send(message.member.displayName + " rolls [" + rolls + "]\n[Final Result] = " + (rolls+mod))
	}
	else 	if (input.includes("c")){
			var cathayrolls = dx(diceNumbers(input, findDice(input,"c")),[10]);
			var orderedrolls = cathayrolls.sort(function(a,b){return a-b});
			message.channel.send(message.member.displayName + " rolls [" + orderedrolls + "] " );
			var heightAndWidth = heightWidth(orderedrolls)
			var heights = heightAndWidth[0]
			var widths = heightAndWidth[1]

			function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] >= max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}
			function heightWidth(arr) {
  var a = [],
    b = [],
    prev;

  arr.sort(function(a,b){return a-b});
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}
function maxHeightSet(heights,widths){
//console.log("heights length =" + heights.length)
	//console.log("widths array" + widths)
	var h = heights.length
	var w = widths[h-1]
//console.log(heights[h] + " width " + w )
	while (w<2) {
//console.log(heights[h-1] + " width " + w);
		h--;
	w = widths[h-1]
	}
	if (h !== 0){ //console.log("the value of h is "+h)
	return w  + " x **" + heights[h-1] +"**"}
	else var noSet = "There are no sets"
	//console.log("h = 0.  noSet = "+noSet)
	return noSet
}
function maxWidthSet(heights,widths){
	var greatestWidth = indexOfMax(widths)
	if (greatestWidth == 1) {return "There are no sets"}
	else var maxWidthSet = (widths[greatestWidth] + " x **"  + heights[greatestWidth]+"**")
	return maxWidthSet
}
			message.channel.send(message.member.displayName + ": Widest set = " +  maxWidthSet(heights,widths)) //widths[greatestWidth] + " x **"  + heights[greatestWidth]+"**" )
			message.channel.send(message.member.displayName + ": Highest set = " + maxHeightSet(heights,widths))
	}
}


client.on('message', message => {
	var fullinput = message.content;
	if (fullinput.substring(0,1)=="!"){
	var input = fullinput.substring(1);
  rolltype(input,message)
}
else if ((fullinput == "help") || (fullinput == "Help")){
	var text = "**!s** Rolls a Stress Die.  Modifiers can be added i.e. *!s+10*  \n**!Xb** Rolls X botch dice. Add w to roll a Weird botch die i.e. *!4bw*  \n**!XdY** Rolls X Y-sided dice.  Additional dice and modifiers can be added i.e. *!2d6+4d10+5* \n**!Xc** Rolls X d10s and calculates widest and highest sets."
	message.channel.send(text)
}
}
);
/*
client.on('message', message => {
	var fullinput = message.content;
	console.log(fullinput);
if (fullinput.substring(0,1)=="!"){
	var input = fullinput.substring(1);
	if (input.includes("b")){
		var botchrolls = dx(diceNumbers(input, findDice(input,"b")),[10]);
		var botches = checkBotch(botchrolls);
		var botchresult
		if (botches == 1) {botchresult = "1 Botch!"}
		else botchresult = (botches + " Botches!")
		message.channel.send(message.member.displayName + " rolls [" + botchrolls + "] \n [Result] = " + botchresult )
	}
}
}
);
*/



client.login(config.token);
