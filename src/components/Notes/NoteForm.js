import React from "react";

function NoteForm({
    noteTitle,
    title,
    content,
    changedTitle,
    changedContent,
    submitHandle,
    submitText,
}) {
    return (
        <div>
            <h2>{noteTitle}</h2>
            <form
                onSubmit={() => {
                    submitHandle({
                        title: title,
                        content: content,
                    });
                }}>
                <input
                    type="text"
                    name="title"
                    className="form-input mb-30"
                    placeholder="Note Title"
                    value={title}
                    onChange={changedTitle}
                    required
                />

                <textarea
                    rows="10"
                    name="content"
                    className="form-input"
                    placeholder="Note Content"
                    value={content}
                    onChange={changedContent}
                    required
                />

                <button href="#" className="button submit green">
                    {submitText}
                </button>
            </form>
        </div>
    );
}

export default NoteForm;
