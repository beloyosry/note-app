import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addNote = createAsyncThunk(
    "notes/addNote",
    async ({ title, content }) => {
        const res = await axios.post("http://localhost:3005/notes", {
            title,
            content,
        });

        return res.data;
    }
);

export { addNote };
