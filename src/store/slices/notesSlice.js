import { createSlice } from "@reduxjs/toolkit";
import { fetchNotes } from "../thunks/fetchNotes";
import { addNote } from "../thunks/addNote";
import { removeNote } from "../thunks/removeNote";
import { editNote, editNoteAction } from "../thunks/editNote";

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notes: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchNotes.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
            .addCase(addNote.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes.push(action.payload);
            })
            .addCase(addNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
            .addCase(removeNote.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(removeNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = state.notes.filter((item) => {
                    return item.id !== action.payload.id;
                });
            })
            .addCase(removeNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
            .addCase(editNoteAction.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(editNoteAction.fulfilled, (state, action) => {
                state.isLoading = false;
                // Update the edited note in the state
                state.notes = state.notes.map((note) =>
                    note.id === action.payload.id
                        ? { ...note, ...action.meta.arg }
                        : note
                );
            })
            .addCase(editNoteAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const notes = notesSlice.reducer;
