export const load = async ({ locals }: { locals: any }) => {
	const user = await locals.getUser();

	return {
		user: user
			? {
					id: user.id,
					email: user.email,
					created_at: user.created_at
				}
			: null
	};
};
