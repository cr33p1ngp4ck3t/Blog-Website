'use client';

import { useState, useEffect } from 'react';
import { client, writeClient } from '@/sanity/lib/client';
import Image from 'next/image';

interface Comment {
    _id: string;
    name: string;
    email: string;
    comment: string;
    _createdAt: string;
}

interface CommentsProps {
    postId: string;
}

export default function Comments({ postId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        comment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            const result = await client.fetch(
                `*[_type == "comment" && references($postId)] | order(_createdAt desc)`,
                { postId }
            );
            setComments(result);
        };

        fetchComments();

        // Subscribe to real-time updates
        const subscription = client.listen(
            `*[_type == "comment" && references($postId)]`,
            { postId }
        ).subscribe((update) => {
            if (update.result) {
                fetchComments();
            }
        });

        return () => subscription.unsubscribe();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await writeClient.create({
                _type: 'comment',
                post: {
                    _type: 'reference',
                    _ref: postId
                },
                ...newComment
            });

            // Reset form
            setNewComment({
                name: '',
                email: '',
                comment: ''
            });
        } catch (error) {
            console.error('Error submitting comment:', error);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="mt-8 mb-8 border-t border-gray-300 pt-8">
            <h2 className="text-3xl font-bold mb-4">Comments</h2>
            
            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newComment.name}
                        onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={newComment.email}
                        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Your comment"
                        value={newComment.comment}
                        onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                        className="w-full p-2 border rounded"
                        rows={4}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-600 disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4 p-5 border border-slate-300 bg-slate-100">
                {comments.map((comment) => (
                    <div key={comment._id} className="border p-4 bg-white">
                        <div className='flex gap-4'>
                            <Image
                            src='/user.svg'
                            alt={comment.name}
                            width={30}
                            height={30}
                            className="rounded-full"
                            />
                            <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg ">{comment.name}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {new Date(comment._createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-2">{comment.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}