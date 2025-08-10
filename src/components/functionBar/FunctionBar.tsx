import SearchBar from './SearchBar';
import NewMessage from './NewMessage';
import OpenForm from '@/components/OpenForm';
import SortDropdown from "@/components/functionBar/SortDropdown";

import React from 'react';
import { MessageType, SortingType } from '@/app/page';

interface FunctionBarProps {
    addMessage: (message: MessageType) => void;
    sorting: SortingType;
    setSorting: React.Dispatch<React.SetStateAction<SortingType>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function FunctionBar({ addMessage, sorting, setSorting, search, setSearch }: FunctionBarProps) {
    // Initialize a state for the "message modal" / pop-up
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <div
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 py-3 mt-4 mb-6 mx-10"
        >
            <NewMessage addMessage={addMessage} setOpenModal={setOpenModal}/>{openModal && (
            <OpenForm
                handleHide={() => setOpenModal(false)}
                onSubmit={addMessage}/>
        )}

            <SearchBar search={search} setSearch={setSearch}/>
            <SortDropdown sorting={sorting} setSortingAction={setSorting}/>
        </div>
    );
}

export default FunctionBar;
