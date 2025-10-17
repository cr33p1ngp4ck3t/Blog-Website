'use client';

import { DiscussionEmbed } from 'disqus-react';

interface DisqusCommentsProps {
  post: {
    title: string;
    slug: string;
  };
}

const DisqusComments: React.FC<DisqusCommentsProps> = ({ post }) => {
  const disqusShortname = 'finaid';
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post.slug}`,
    identifier: post.slug,
    title: post.title,
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;