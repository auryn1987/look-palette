export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	tags: string[];
	image: string;
	component?: any;
}

export interface Profile {
	user_id: string;
	display_name: string;
	country: string;
	created_at: string;
	updated_at: string;
}

export interface Newsletter_Subscriptions {
	id: string;
	user_id: string;
	email: string;
	status: Newsletter_Status;
	source: string;
	unsubscribed_at: string;
	confirmed_at: string;
	double_opt_in_token: string;
	created_at: string;
}

export type Newsletter_Status = 'unconfirmed' | 'subscribed' | 'unsubscribed' | 'bounced';

export interface User_Palettes {
	id: string;
	user_id: string;
	season: Seasonal_Palettes;
	method: string;
	confidence: number;
	source_image_path: string;
	is_current: boolean;
	created_at: string;
}

export type Seasonal_Palettes =
	| 'Clear Spring'
	| 'Warm Spring'
	| 'Light Spring'
	| 'Light Summer'
	| 'Cool Summer'
	| 'Soft Summer'
	| 'Clear Winter'
	| 'Cool Winter'
	| 'Deep Winter'
	| 'Warm Autumn'
	| 'Soft Autumn'
	| 'Deep Autumn';
