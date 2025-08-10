import React, {useState} from "react";
import SortMessages from "@/functions/SortMessages";
import MessageDropdown from "@/components/MessageDropdown";
import EditModal from "@/components/EditModal";
import {MessageType} from "@/app/page";

interface MessageCardProps {
    allMessages: MessageType[];
    sorting: string;
    onUpdate: (updated: MessageType) => void;
    onDelete: (id: string) => void;
}

function MessageCard({allMessages, sorting, onUpdate, onDelete}: MessageCardProps) {

    // Using imported function to sort the messages according to the uses preference
    const sortedMessages = SortMessages(sorting, allMessages);

    const [editOpen, setEditOpen] = useState(false);
    const [editingMessage, setEditingMessage] = useState<MessageType | null>(null);

    // Opens edit modal/ pop-up
    const handleEdit = (message: MessageType) => {
        setEditingMessage(message);
        setEditOpen(true);
    };


    const handleSave = (title: string, content: string) => {

        // Updates message and "updatedAt"
        if (editingMessage) {
            onUpdate({
                ...editingMessage,
                title,
                content,
                updatedAt: new Date(),
            });
            setEditOpen(false);
            setEditingMessage(null);
        }
    };

    return (
        <>
            <ul className="ml-10 mt-10 space-y-4 w-fit whitespace-normal max-w-2xl overflow-wrap break-words">
                {sortedMessages.map((message) => (
                    <li
                        key={message.id}
                        className="border border-violet-200 rounded-2xl shadow-sm p-4 bg-violet-200 hover:bg-violet-300"
                    >
                        <div className="flex items-center">
                            <h1 className="text-3xl font-extrabold">{message.title}</h1>
                            <MessageDropdown
                                message={message}
                                onEditAction={() => handleEdit(message)}
                                onDeleteAction={() => onDelete(message.id)}
                            />
                        </div>

                        {/* Makes the date and time look nicer */}
                        <div className="flex items-center mt-1">
                            <div className="text-xs text-slate-700">
                                Created: {message.createdAt.toDateString()} ({message.createdAt.toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                            })}) |
                            </div>
                            <div className="ml-1 text-xs text-indigo-700">
                                Updated: {message.updatedAt.toDateString()} ({message.updatedAt.toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                                })})

                            </div>
                        </div>
                        <p className="mt-2">{message.content}</p>
                    </li>
                ))}
            </ul>

            {/* Conditionally renders the edit modal/ pop-up*/}
            {editingMessage && (
                <EditModal
                    open={editOpen}
                    onCloseAction={() => setEditOpen(false)}
                    initialTitle={editingMessage.title}
                    initialContent={editingMessage.content}
                    onSaveAction={handleSave}
                />
            )}
        </>
    );
}

export default MessageCard;
