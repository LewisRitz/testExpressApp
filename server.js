'use strict'
const express = require('express');
const Slapp = require('slapp');
const BeepBoopConvoStore = require('slapp-convo-beepboop');
const BeepBoopContext = require('slapp-context-beepboop');

//if (!process.env.PORT) throw Error('PORT missing but requried');

var slapp = Slapp({
	convo_store: BeepBoopConvoStore(),
	context: BeepBoopContext()
});

var app = slapp.attachToExpress(express());

slapp.message('hi (.*)', ['direct_message'], (msg, text, match1) => {
	msg.say('How are you?').route('handleHi', { what: match1 })
});

slapp.route('handleHi', (msg, state) => {
	msg.say(':smile:' + state.what)
});

app.get('/', function(req, res){
	res.send('Hello')
});

console.log('Listening on :' + 8081);
app.listen(8081);