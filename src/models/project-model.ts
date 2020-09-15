import db from '../data/db-config'

export function addProject(project: object | undefined) {
  if (!project) throw new Error('Can\'t add an undefined project.')
  return db('projects').insert(project).then(ids => {
    process.stdout.write(`Project ${ids} has been added to the database`)
    return ids
  }).catch(error => error)
}
