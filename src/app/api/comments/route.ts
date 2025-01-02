import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';

export async function POST(req: Request) {
    try {
        const { name, email, comment, postId } = await req.json();

        if (!name || !email || !comment || !postId) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const result = await writeClient.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: postId,
            },
            name,
            email,
            comment,
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error submitting comment:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
