import { supabase } from '$lib/supabase';

export const load = async () => {
	// Get the current session
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// Only return user if we have a valid session with access token
	const user = session?.access_token ? session.user : null;

	return {
		user,
		session
	};
};
