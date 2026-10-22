import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import type { Post } from "@/sanity/types";
export default function AuthorBio({ author }: { author: Post["author"] }) {
  return (
    <div className="author-bio">
      {author?.image ? (
        <Image
          src={urlFor(author.image).width(100).height(100).url()}
          alt={author.name}
          width={55}
          height={55}
        />
      ) : (
        <span className="author-icon" aria-hidden="true">
          F
        </span>
      )}
      <div>
        <h3>{author?.name || "FinAid Hub editorial"}</h3>
        {author?.bio?.length ? (
          <PortableText value={author.bio} />
        ) : (
          <p>
            Clear, practical money guides with sources you can check and next
            steps you can use.
          </p>
        )}
      </div>
    </div>
  );
}
