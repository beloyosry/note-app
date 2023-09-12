import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeNote = createAsyncThunk("notes/removeNote", async (note) => {
    await axios.delete(`http://localhost:3005/notes/${note.id}`);

    await pause(1000);

    return note.id;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};
export { removeNote };
