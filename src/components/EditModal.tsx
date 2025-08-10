"use client";

import React, {useState, useEffect} from "react";

interface EditModalProps {
    open: boolean;
    onCloseAction: () => void;
    initialTitle: string;
    initialContent: string;
    onSaveAction: (title: string, content: string) => void;
}

export default function EditModal({open, onCloseAction, initialTitle, initialContent, onSaveAction}: EditModalProps) {

    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [error, setError] = useState<string | null>(null);

    // Fills the title and content with the previous values
    useEffect(() => {
        if (open) {
            setTitle(initialTitle);
            setContent(initialContent);
        }
    }, [open, initialTitle, initialContent]);

    if (!open) return null;

    // If the title or content field is empty, then call an error, else save and close the modal
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError("Title and content are required.");
            return;
        }
        setError(null);

        // Saves and closes
        onSaveAction(title, content);
        onCloseAction();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-indigo-900/70">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                    <h5 className="text-2xl font-semibold m-2">Edit Post</h5>

                    {/* Renders the error message */}
                    {error && (
                        <div className="text-red-600 px-4 py-2">{error}</div>
                    )}

                    <button
                        type="button"
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={onCloseAction}
                    >
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="px-4 py-4">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            autoFocus
                        />
                    </div>
                    <div className="px-4 py-4">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}

                            // Allows for saving changes when clicking enter instead of having to press the button
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !(e.shiftKey)) {
                                    e.preventDefault();
                                    (e.target as HTMLTextAreaElement).form?.requestSubmit();
                                }
                            }}

                            placeholder="Description..."
                            className="w-full p-2 border border-gray-200 rounded-lg resize-none min-h-[80px]"
                        />
                    </div>
                    <div className="px-4 py-2 pb-3 flex gap-2">
                        <button
                            type="submit"
                            className="h-9 text-white bg-blue-700 rounded-full hover:bg-blue-800 w-full"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
