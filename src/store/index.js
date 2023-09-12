import { configureStore } from "@reduxjs/toolkit";
import { notes } from "./slices/notesSlice";
import { notesStatus } from "./slices/notesStatusSlice";
import {
    setSelectedNote,
    setCreateNote,
    setEditNote,
    setNoteBody,
} from "./slices/notesStatusSlice";

export const store = configureStore({
    reducer: { notes, notesStatus },
});

export * from "./thunks/fetchNotes";
export * from "./thunks/addNote";
export * from "./thunks/removeNote";
export * from "./thunks/editNote";
export { setSelectedNote, setCreateNote, setNoteBody, setEditNote };
