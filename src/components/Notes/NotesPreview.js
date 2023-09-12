import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useThunk } from "../../hooks/use-thunk";
import { removeNote, setCreateNote } from "../../store";
import NoteForm from "./NoteForm";
import Swal from "sweetalert2";

function NotesPreview({
    note,
    setSelectedNote,
    selectedNote,
    doFetchNotes,
    noteBody,
    handleTitleChange,
    handleContentChange,
    doEditNote,
    setNoteBody,
    editNote,
    setEditNote,
}) {
    const [doRemoveNote, isLoadingRemove, error] = useThunk(removeNote);

    const dispatch = useDispatch();

    const handleDelete = () => {
        Swal.fire({
            title: `You are about to delete a note with the title
            "${note.title}"`,
            showCancelButton: true,
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await doRemoveNote(note).then(() => {
                    doFetchNotes();
                    dispatch(setSelectedNote(null));
                });
            }
        });
    };

    const handleEdit = () => {
        dispatch(setEditNote(true)); // Set edit mode
        dispatch(
            setNoteBody({
                title: note.title,
                content: note.content,
            })
        );
    };

    let noteContent;

    if (selectedNote) {
        noteContent = (
            <div>
                <div className="note-operations">
                    <a href="#" onClick={handleEdit}>
                        <i className="fa fa-pencil-alt" />
                    </a>
                    <a href="#" onClick={handleDelete}>
                        {isLoadingRemove ? (
                            <i className="fa fa-spinner fa-spin" />
                        ) : (
                            <i className="fa fa-trash" />
                        )}
                    </a>
                </div>
                <div>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                </div>
            </div>
        );

        if (editNote) {
            dispatch(setCreateNote(false));

            noteContent = (
                <NoteForm
                    noteTitle="Edit Note"
                    title={noteBody.title}
                    content={noteBody.content}
                    changedTitle={handleTitleChange}
                    changedContent={handleContentChange}
                    submitHandle={() => {
                        doEditNote({
                            id: note.id,
                            title: noteBody.title,
                            content: noteBody.content,
                        });
                        dispatch(setEditNote(false));
                        dispatch(
                            setNoteBody({
                                title: "",
                                content: "",
                            })
                        );
                    }}
                    submitText="Edit"
                />
            );
        }
    } else {
        noteContent = <div>Select a note to preview</div>;
    }

    return noteContent;
}

export default NotesPreview;
