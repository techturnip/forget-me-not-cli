/* eslint-disable unicorn/filename-case */
import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('projects', project => {
      // primary key
      project.increments()
      // Project name
      project.string('name', 128).notNullable()
      // Project desc
      project.string('description', 256).notNullable()
      // Project version
      project.string('version', 20).notNullable()
      // Project path
      project.string('path', 128).notNullable()
    })
    .createTable('todos', todo => {
      // primary key
      todo.increments()
      // foreign key for project relationship
      todo
        .integer('project_id')
        .references('id')
        .inTable('projects')
        .notNullable()
      // todo name
      todo
        .string('name', 128)
        .unique()
        .notNullable()
      // todo description
      todo.string('description', 256).notNullable()
      // completion status
      todo.boolean('completed').notNullable().defaultTo(false)
      todo
        .timestamps(false, true)
    })
}

export async function down(knex: Knex): Promise<void> {
  // drop projects table
  return knex.schema.dropTableIfExists('projects')
}

