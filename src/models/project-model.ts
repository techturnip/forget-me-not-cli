import db from '../data/db-config'

// export const addProject = (project: object | undefined) => project ? db('projects').insert(project) : new Error('Oops')

export const addProject = async (project: object | undefined) => {
	if (!project) throw new Error('Something went wrong')

	try {
		const ids = await db('projects').insert(project)
		const projectDetails = await db('projects').where({id: ids[0]}).first()
		return projectDetails
	} catch (error) {
		throw new Error(error)
	}
}
