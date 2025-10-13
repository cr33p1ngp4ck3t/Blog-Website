export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: string;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  categories: string[];
  publishedAt: string;
  body: {
    _key: string;
    style?: string;
    children: { text: string }[];
  }[];
}
