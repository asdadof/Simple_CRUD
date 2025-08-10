"use client";

import React, {useState, useRef, useEffect} from "react";
import {MessageType} from "@/app/page";

interface MessageDropdownProps {
    message: MessageType;
    onEditAction: (message: MessageType) => void;
    onDeleteAction: (id: string) => void;
}


export default function MessageDropdown({message, onEditAction, onDeleteAction}: MessageDropdownProps) {

    const [open, setOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    return (
        <div className="relative ml-auto" ref={ref}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-3 rounded-4xl"
            >
                <span className="text-2xl">&#8942;</span>
            </button>

            <div
                className={`absolute left-6 top-full bg-white border border-gray-300 rounded-lg min-w-[150px] z-10 shadow h-max
                transition-all duration-200 ease-out
        ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
      `}
            >
                <button
                    onClick={() => {
                        onEditAction(message);
                        setOpen(false);
                    }}
                    className="w-full px-3 py-2 m-1/2 bg-none border-none text-left cursor-pointer text-sm text-gray-800 hover:bg-gray-100 flex rounded-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                         fill="currentColor">
                        <path
                            d="M2 17.25V21h3.75L17.81 8.94l-3.75-3.75L2 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
                    </svg>
                    <div className="ml-1 mt-1   ">
                        Edit
                    </div>
                </button>
                <button
                    onClick={() => {
                        setShowConfirm(true)
                        setOpen(false);
                    }}
                    className="w-full px-3 py-2 m-1/2 bg-none border-none text-left cursor-pointer text-sm text-gray-800 hover:bg-gray-100 text-red-600 flex rounded-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         viewBox="0 0 16 16" className="mb-2">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                    <div className="ml-1 mt-1 rounded-full">
                        Delete
                    </div>
                </button>
            </div>
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white border border-gray-300 rounded-lg shadow min-w-[320px] max-w-xs w-full p-5">
                        <div className="text-base font-medium text-gray-900 mb-3">Confirm Deletion</div>
                        <div className="mb-5 text-sm text-gray-700">
                            Are you sure you want to delete this message?
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onDeleteAction(message.id);
                                    setShowConfirm(false);
                                    setOpen(false);
                                }}
                                className="px-3 py-1.5 rounded-lg text-sm bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}