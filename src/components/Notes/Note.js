import React from "react";

const Note = ({ title, noteClicked, active }) => {
    return (
        <li
            className={`note-item ${active && "active"} `}
            onClick={noteClicked}>
            {title}
        </li>
    );
};

export default Note;
