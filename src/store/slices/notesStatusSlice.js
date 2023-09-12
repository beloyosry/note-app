import { createSlice } from "@reduxjs/toolkit";

export const notesStatusSlice = createSlice({
    name: "notesStatus",
    initialState: {
        selectedNote: null,
        createNote: false,
        editNote: false,
        noteBody: {
            title: "",
            content: "",
        },
    },
    reducers: {
        setSelectedNote: (state, action) => {
            console.log(action.payload);
            state.selectedNote = action.payload;
        },
        setCreateNote: (state, action) => {
            state.createNote = action.payload;
        },
        setEditNote: (state, action) => {
            state.editNote = action.payload;
        },
        setNoteBody: (state, action) => {
            state.noteBody = {
                ...state.noteBody,
                ...action.payload,
            };
        },
    },
});

export const { setSelectedNote, setCreateNote, setEditNote, setNoteBody } =
    notesStatusSlice.actions;
export const notesStatus = notesStatusSlice.reducer;
