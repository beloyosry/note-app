import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchNotes = createAsyncThunk("notes/getNotes", async () => {
    const res = await axios.get("http://localhost:3005/notes");

    await pause(1000);

    return res.data;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchNotes };
