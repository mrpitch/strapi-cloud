export default {
	/**
	 * An asynchronous register function that runs before
	 * your application is initialized.
	 *
	 * This gives you an opportunity to extend code.
	 */
	//register(/*{ strapi }*/) {},
	register({ strapi }) {
		const extensionService = strapi.service('plugin::graphql.extension')

		extensionService.use(({ strapi }) => ({
			typeDefs: `
			type Query {
				exercise(slug: String!): ExerciseEntityResponse
				workout(slug: String!): WorkoutEntityResponse
			}`,
			resolvers: {
				Query: {
					exercise: {
						resolve: async (parent, args, context) => {
							const { toEntityResponse } = strapi.service(
								'plugin::graphql.format'
							).returnTypes

							const data = await strapi.services['api::exercise.exercise'].find(
								{
									filters: { slug: args.slug },
								}
							)

							const response = toEntityResponse(data.results[0])

							return response
						},
					},
					workout: {
						resolve: async (parent, args, context) => {
							const { toEntityResponse } = strapi.service(
								'plugin::graphql.format'
							).returnTypes

							const data = await strapi.services['api::workout.workout'].find({
								filters: { slug: args.slug },
							})

							const response = toEntityResponse(data.results[0])

							return response
						},
					},
				},
			},
		}))
	},

	/**
	 * An asynchronous bootstrap function that runs before
	 * your application gets started.
	 *
	 * This gives you an opportunity to set up your data model,
	 * run jobs, or perform some special logic.
	 */
	bootstrap(/*{ strapi }*/) {},
}
