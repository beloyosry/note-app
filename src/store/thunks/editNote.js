import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const editNoteAction = createAsyncThunk("notes/editNote", async (note) => {
    const { id, title, content } = note;
    const res = await axios.put(`http://localhost:3005/notes/${id}`, {
        title,
        content,
    });
    await pause(1000);
    return res.data;
});
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};
export { editNoteAction };
