import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

interface SanityImageSource {
	asset: string;
}

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
