const yargs = require('yargs');
const fs = require('fs');
const notes = require('./notes.js');
const chalk = require('chalk')

// Customize yargs version
yargs.version('1.1.0');

// Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body); // Call the addNote function with arguments
    }
});

// Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
});

// Read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: () => {
        console.log("Reading a note");
    }
});

// List command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: () => {
        notes.listNotes();
    }
});

// Parse the arguments
yargs.parse();
