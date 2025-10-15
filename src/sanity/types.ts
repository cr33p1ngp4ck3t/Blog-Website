export interface Post {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	author: {
		name: string;
		image: {
			asset: string;
		};
		bio: {
			_key: string;
			_type: string;
			style?: string;
			children: { text: string }[];
		}[];
	};
	mainImage: {
		asset: string;
	};
	categories: string[];
	publishedAt: string;
	body: {
		_key: string;
		_type: string;
		style?: string;
		children: { text: string }[];
	}[];
}
