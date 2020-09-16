import db from '../data/db-config'

// export const addProject = (project: object | undefined) => project ? db('projects').insert(project) : new Error('Oops')

export const addProject = async (project: object | undefined, logger: (message?: string | undefined, ...args: any[]) => void) => {
	if (!project) throw new Error('Something went wrong')

	try {
		logger ? logger('Adding project to db...') : null
		const ids = await db('projects').insert(project)
		logger ? logger('Checking db for project...') : null
		const projectDetails = await db('projects').where({id: ids[0]}).first()

		db.destroy()
		return projectDetails
	} catch (error) {
		db.destroy()
		throw new Error(error)
	}
}
