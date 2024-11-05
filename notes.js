const fs = require('fs');
const chalk = require('chalk')
const getNotes = function () {
    return 'Your notes...';
};

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.filter(function (note) {
        return note.title === title;
    });

    if (duplicateNote.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note title taken!');
    }
};

// Remove a note by title
const removeNote = function (title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title;
    });

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep); // Save the updated notes array
        console.log(chalk.green.inverse('Note removed'))
        //console.log("Note removed successfully");
    } else {
        console.log(chalk.green.inverse('Note not found'))
    }
};
//List all the notes
const listNotes = function () {
    console.log(chalk.green.inverse('Your Notes'))
    const notes = loadNotes();

    notes.forEach((note) => {
        console.log(note.title)
    })

}
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
};
