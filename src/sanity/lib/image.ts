import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import { getPlaiceholder } from "plaiceholder";

const builder = imageUrlBuilder(client);

interface SanityImageSource {
  asset: {
    _ref: string;
    _type: string;
  };
}

export async function urlFor(source: SanityImageSource) {
  const imageUrl = builder.image(source).width(800).height(400).url();
  const buffer = await fetch(imageUrl).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);

  return {
    src: imageUrl,
    blurDataURL: base64,
  };
}
