import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';

export async function POST(req: Request) {
    try {
        const { postId } = await req.json();

        if (!postId) {
            return NextResponse.json({ success: false, error: 'Missing postId' }, { status: 400 });
        }

        const post = await writeClient.fetch(`*[_id == $postId][0]`, { postId });

        if (!post) {
            return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        }

        const updatedPost = await writeClient.patch(postId)
            .setIfMissing({ views: 0 })
            .inc({ views: 1 })
            .commit();

        return NextResponse.json({ success: true, data: updatedPost });
    } catch (error) {
        console.error('Error updating view count:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
