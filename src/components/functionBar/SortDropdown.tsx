"use client";

import React, { useState, useRef, useEffect } from "react";
import type { SortingType } from "@/app/page";

const options = [
    { label: "Title (A-Z)", value: "asc" },
    { label: "Last edited", value: "updated_asc" },
    { label: "Date (Old-new)", value: "created_asc" },
    { label: "Date (New-old)", value: "created_desc" },
];

interface SortDropdownProps {
    sorting: SortingType;
    setSortingAction: React.Dispatch<React.SetStateAction<SortingType>>;
}

export default function SortDropdown({ sorting, setSortingAction }: SortDropdownProps) {
    const [open, setOpen] = useState(false);
    const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);

    const selected = options.find(option => option.value === sorting) || options[0];

    const ref = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    // Measure button width on mount and when open state changes
    useEffect(() => {
        if (buttonRef.current) {
            setButtonWidth(buttonRef.current.offsetWidth);
        }
    }, [open, selected]);

    const handleSelect = (option: typeof options[0]) => {
        setSortingAction(option.value as SortingType);
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative inline-block min-w-[120px] w-1/8 border rounded-full">
            <button
                ref={buttonRef}
                onClick={() => setOpen((v) => !v)}
                className="flex items-center px-3 py-2 rounded-full w-full focus:outline-none
                focus:ring-2 focus:ring-blue-400 hover:bg-gray-200 transition whitespace-nowrap"
                type="button"
            >
                {selected.label}
                <span className="ml-2">{open ? "▲" : "▼"}</span>
            </button>
            {open && (
                <div
                    className="absolute right-0 top-full bg-white border border-gray-300 rounded-lg mt-1 z-10 shadow w-full"
                    style={{minWidth: "120px"}}
                >
                    <div className="px-2 py-2 text-xs text-gray-500">Sort by</div>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            className={`block w-full px-3 py-2 text-left cursor-pointer text-sm text-gray-800 hover:bg-gray-100 ${
                                selected.value === option.value ? "font-bold" : ""
                            }`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
