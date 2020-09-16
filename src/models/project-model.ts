// ==========================================|
// IMPORTS ----------------------------------|
// ==========================================|
import {green, red} from 'chalk'
import db from '../data/db-config'
// ------------------------------------------|
// DB HELPER METHODS ------------------------|
// ==========================================|
// ADD PROJECT ------------------------------|
// ------------------------------------------|
export const addProject = async (project: object | undefined, logger: (message?: string | undefined, ...args: any[]) => void) => {
	if (!project) throw new Error('Something went wrong')

	// instantiate variables
	let ids // array of ids inserted into db
	let projectDetails // store the project retrieved from db

	// wrap db ops in try/catch for error handling
	try {
		// log message for user feedback
		logger(green(' Adding project to db... '))
		// insert project into db, store result in ids
		ids = await db('projects').insert(project)
	} catch (error) { // catch any errors thrown by db op
		// if we catch an error we destroy the db connection
		db.destroy() // without this the db connection causes the cli to hang
		// throw error
		throw new Error(red('There was an error adding project to db\nThe project likely already exists in the db\n'))
	}

	// attempt to retrieve the project from the db
	try {
		// log message for user feedback
		logger('Checking db for project...')
		// retrieve project from db to ensure that it is contained
		projectDetails = db('projects').where({id: ids[0]}).first()
	} catch (error) { // catch any errors thrown by db op
		// if we catch an error we destroy the db connection
		db.destroy() // without this the db connection causes the cli to hang
		// throw error
		throw new Error(red('There was an error checking db for project\n' + error))
	}

	// destroy db connection
	db.destroy() // prevents cli from hanging

	// return the project details
	return projectDetails
}
// ------------------------------------------|
