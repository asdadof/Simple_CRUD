import {MessageType} from "@/app/page";

export default function SortMessages(sorting: string, messages: MessageType[]) {
    const sorted = [...messages];
    switch (sorting) {
        case "asc":
            sorted.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
            break;
        case "updated_asc":
            sorted.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
            break;
        case "created_asc":
            sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            break;
        case "created_desc":
            sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            break;
        default:
            break;
    }
    return sorted;
}

