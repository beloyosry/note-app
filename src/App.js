import React, { useEffect, useState } from "react";
import "./App.css";
import NotesContainer from "./components/Notes/NotesContainer";
import NotesList from "./components/Notes/NotesList";
import Note from "./components/Notes/Note";
import { useDispatch, useSelector } from "react-redux";
import {
    addNote,
    fetchNotes,
    setSelectedNote,
    setCreateNote,
    setNoteBody,
    editNoteAction,
    setEditNote,
} from "./store";
import NotesPreview from "./components/Notes/NotesPreview";
import { useThunk } from "./hooks/use-thunk";
import NoteForm from "./components/Notes/NoteForm";

function App() {
    const dispatch = useDispatch();

    const [doFetchNotes, isLoadingNotes, loadingNotesError] =
        useThunk(fetchNotes);
    const [doAddNotes, isLoadingAddNotes, loadingAddNotesError] =
        useThunk(addNote);
    const [doEditNote, isLoadingEditNote, editNoteError] =
        useThunk(editNoteAction);

    const { notes } = useSelector((state) => state.notes);
    const { selectedNote, createNote, noteBody, editNote } = useSelector(
        (state) => state.notesStatus
    );

    const handleTitleChange = (event) => {
        dispatch(
            setNoteBody({
                ...noteBody,
                title: event.target.value,
            })
        );
    };

    const handleContentChange = (event) => {
        dispatch(
            setNoteBody({
                ...noteBody,
                content: event.target.value,
            })
        );
    };

    useEffect(() => {
        doFetchNotes();
    }, [doFetchNotes, isLoadingAddNotes, doEditNote]);

    // Set content based on conditions
    let content = null; // Initialize content
    const note = notes.find((note) => note.id === selectedNote);

    if (isLoadingNotes || isLoadingEditNote) {
        content = <h3>Loading...</h3>;
    } else if (loadingNotesError) {
        content = <div>Error fetching note</div>;
    } else if (selectedNote) {
        content = (
            <NotesPreview
                note={note}
                setSelectedNote={setSelectedNote}
                selectedNote={selectedNote}
                doFetchNotes={doFetchNotes}
                noteBody={noteBody}
                handleTitleChange={handleTitleChange}
                handleContentChange={handleContentChange}
                doEditNote={doEditNote}
                setNoteBody={setNoteBody}
                editNote={editNote}
                setEditNote={setEditNote}
            />
        );
    } else if (notes.length === 0) {
        content = <h2>No notes to show, Create a new one</h2>;
    } else if (selectedNote === null) {
        content = <h2>Select a note to preview</h2>;
    }

    return (
        <div className="App">
            <NotesContainer>
                <NotesList>
                    {isLoadingNotes || isLoadingEditNote ? (
                        <li className="note-item-loading">
                            <h5 className="text-center">Loading...</h5>
                        </li>
                    ) : (
                        notes.map((note) => (
                            <Note
                                key={note.id}
                                title={note.title}
                                noteClicked={() => {
                                    dispatch(setSelectedNote(note.id));
                                    dispatch(
                                        setNoteBody({
                                            title: "",
                                            content: "",
                                        })
                                    );
                                    dispatch(setCreateNote(false));
                                    dispatch(setEditNote(false));
                                }}
                                active={selectedNote === note.id}
                            />
                        ))
                    )}
                </NotesList>

                <button
                    className="add-btn"
                    onClick={() => {
                        dispatch(setCreateNote(true));
                        console.log(createNote);
                        if (editNote) {
                            dispatch(setCreateNote(false));
                        }
                    }}>
                    +
                </button>
            </NotesContainer>
            <div className="preview-section">
                {(createNote &&
                    (() => {
                        dispatch(setSelectedNote(null));
                        return (
                            <NoteForm
                                noteTitle="Create Note"
                                title={noteBody.title}
                                content={noteBody.content}
                                changedTitle={handleTitleChange}
                                changedContent={handleContentChange}
                                submitHandle={() => {
                                    dispatch(setCreateNote(false));
                                    dispatch(
                                        setNoteBody({
                                            title: "",
                                            content: "",
                                        })
                                    );
                                    doAddNotes({
                                        title: noteBody.title,
                                        content: noteBody.content,
                                    });
                                }}
                                submitText="Save"
                            />
                        );
                    })()) ||
                    content}
            </div>
        </div>
    );
}

export default App;
