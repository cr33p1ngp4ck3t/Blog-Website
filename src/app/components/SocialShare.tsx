"use client";

import {
  FacebookShareButton,
  XShareButton,
  LinkedinShareButton,
  FacebookLegacyIcon,
  XLegacyIcon,
  LinkedinLegacyIcon,
} from "react-share";

interface SocialShareProps {
  url: string;
  title: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
  return (
    <div className="share-row">
      <h3>Pass a good read along</h3>
      <FacebookShareButton url={url} aria-label="Share on Facebook">
        <FacebookLegacyIcon size={32} round />
      </FacebookShareButton>
      <XShareButton url={url} text={title} aria-label="Share on X">
        <XLegacyIcon size={32} round />
      </XShareButton>
      <LinkedinShareButton url={url} aria-label="Share on LinkedIn">
        <LinkedinLegacyIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}
