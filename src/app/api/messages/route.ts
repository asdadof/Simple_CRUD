import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/db';
import { MessageType } from "@/app/page";

// GET all messages
export async function GET() {
    const messages = db.prepare('SELECT * FROM messages').all() as MessageType[];
    return NextResponse.json(messages);
}

// POST a new message
export async function POST(req: NextRequest) {
    const { title, content } = await req.json();
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    db.prepare(
        'INSERT INTO messages (id, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)'
    ).run(id, title, content, now, now);

    return NextResponse.json({ id, title, content, createdAt: now, updatedAt: now });
}
