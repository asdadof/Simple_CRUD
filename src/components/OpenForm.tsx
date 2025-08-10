"use client";

import {useState} from "react";
import {MessageType} from "@/app/page";
import React from "react";

interface OpenFormProps {
    handleHide: () => void;
    onSubmit: (message: MessageType) => void;
}

function OpenForm({handleHide, onSubmit}: OpenFormProps) {

    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        // When pressed enter, it does not create a new line
        e.preventDefault();

        // Checks for empty fields
        if (!Title.trim() || !Content.trim()) {
            setError("Title and content are required");
            return;
        }
        setError(null);

        // Fills missing fields
        const updatedAt = new Date();
        const createdAt = new Date();
        const id = crypto.randomUUID();

        onSubmit({id, title: Title, content: Content, createdAt, updatedAt});
        handleHide();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-indigo-900/70">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                    <h5 className="text-2xl font-semibold m-2">New message</h5>

                    {error && (
                        <div className="text-red-600 mr-1 text-sm">{error}</div>
                    )}

                    <button
                        type="button"
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={handleHide}
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
                            value={Title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            autoFocus

                        />
                    </div>
                    <div className="px-4 py-4">
                    <textarea
                        value={Content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !(e.shiftKey)) {
                                e.preventDefault();
                                (e.target as HTMLTextAreaElement).form?.requestSubmit();
                            }
                        }}
                        placeholder="Content..."
                        className="w-full p-2 border border-gray-200 rounded-lg resize-none min-h-[80px]"
                    />
                    </div>
                    <div className="px-4 py-2 pb-3">
                        <button

                            type="submit"
                            className="w-full h-9  text-white bg-indigo-300 rounded-full hover:bg-indigo-400"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OpenForm;
