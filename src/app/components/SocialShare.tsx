"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import {
  FacebookShareButton,
  XShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookLegacyIcon,
  XLegacyIcon,
  LinkedinLegacyIcon,
  WhatsappLegacyIcon,
} from "react-share";

interface SocialShareProps {
  url: string;
  title: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const [message, setMessage] = useState("");
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied");
    } catch {
      setMessage("Copy the URL from your address bar to share this guide.");
    }
  }
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
      <WhatsappShareButton url={url} message={title} aria-label="Share on WhatsApp">
        <WhatsappLegacyIcon size={32} round />
      </WhatsappShareButton>
      <button className="icon-button" onClick={copyLink} aria-label="Copy article link">
        <Copy size={19} />
      </button>
      <p className="share-status" role="status">{message}</p>
    </div>
  );
}
