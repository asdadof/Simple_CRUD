import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/db';

// DELETE a message
export async function DELETE(
    _req: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = await context.params;
    db.prepare('DELETE FROM messages WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
}


// PATCH (update) a message
export async function PATCH(
    req: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = await context.params;
    const { title, content } = await req.json();
    const now = new Date().toISOString();

    db.prepare(
        'UPDATE messages SET title = ?, content = ?, updatedAt = ? WHERE id = ?'
    ).run(title, content, now, id);

    return NextResponse.json({ id, title, content, updatedAt: now });
}

