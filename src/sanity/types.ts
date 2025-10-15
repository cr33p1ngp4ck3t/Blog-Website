export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: {
    name: string;
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    bio: {
      _key: string;
      style?: string;
      children: { text: string }[];
    }[];
  };
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
