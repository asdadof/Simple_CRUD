import {MessageType} from '@/app/page';

import React from "react";

interface NewMessageProps {
    addMessage: (message: MessageType) => void;
    setOpenModal: (open: boolean) => void;
}

export default function NewMessageButton({setOpenModal}: NewMessageProps) {
    return (
        <button
            onClick={e => {
                e.currentTarget.blur();
                setOpenModal(true);
            }}
            className="text-base sm:text-lg rounded-full border-2 border-[#635bff]
            py-2 px-4 transition-all shadow-sm hover:shadow-lg text-[#635bff]
            hover:text-white hover:bg-violet-700 disabled:pointer-events-none
            disabled:opacity-50 disabled:shadow-none w-auto whitespace-nowrap
            focus:outline-none focus:ring-2 focus:ring-violet-400
            overflow-hidden truncate min-w-0"
        >
            + Add Message
        </button>

    );
}
