"use client";

// Importing relevant components and react objects
import MessageCard from "@/components/MessageCard";
import Function_bar from "@/components/functionBar/FunctionBar";
import SortMessages from "@/functions/SortMessages";
import { useState, useEffect } from "react";
import React from "react";

// Defines and exports two types to avoid using :any
export type MessageType = {
    id: string,
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

export type SortingType =  "created_desc" | "created_asc" | "asc" | "updated_asc" | "";

export default function Home() {

    // Initializing states
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [sorting, setSorting] = useState<SortingType>("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch('/api/messages')
            .then(res => res.json())
            .then((data) => {
                // Convert date strings to Date objects
                const messages = data.map((msg: MessageType) => ({
                    ...msg,
                    createdAt: new Date(msg.createdAt),
                    updatedAt: new Date(msg.updatedAt),
                }));
                setMessages(messages);
            });
    }, []);

    // Adds a new message to the existing messages
    async function newMessage(message: MessageType) {
        const res = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message),
        });
        const data = await res.json();
        setMessages(prev => [
            ...prev,
            { ...data, createdAt: new Date(data.createdAt), updatedAt: new Date(data.updatedAt) }
        ]);
    }

    // Deletes a messages based on the id
    async function handleDelete(id: string) {
        await fetch(`/api/messages/${id}`, { method: 'DELETE' });
        setMessages(prev => prev.filter(msg => msg.id !== id));
    }

    // Updates a selected message
    async function handleUpdate(updated: MessageType) {
        const res = await fetch(`/api/messages/${updated.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated),
        });
        const data = await res.json();
        setMessages(prev =>
            prev.map(msg =>
                msg.id === updated.id
                    ? { ...msg, ...data, createdAt: new Date(data.createdAt), updatedAt: new Date(data.updatedAt) }
                    : msg
            )
        );
    }

    // Searches through the array of messages and returns only those who include the search term
    const filteredMessages = messages.filter(
        (msg) =>
            msg.title.toLowerCase().includes(search.toLowerCase()) ||
            msg.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="justify-center select-none">
            <h1 className="text-4xl ml-10 mt-10 font-bold">Messages</h1>
            {/* Function bar is what I have called the "add message button", the search bar and the sort-dropdown */}
            <Function_bar
                addMessage={newMessage}
                sorting={sorting}
                setSorting={setSorting}
                search={search}
                setSearch={setSearch}
            />
            {/* Displays all messages */}

            <MessageCard
                allMessages={SortMessages(sorting, filteredMessages)}
                sorting={sorting}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
        </div>
    );
}