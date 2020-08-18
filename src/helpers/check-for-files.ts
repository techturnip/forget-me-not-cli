import {existsSync} from 'fs'

// uses the existsSync method to check if a file exists
// takes in a path as a string and returns true or false
// if the file at the path exists
export default function checkForFile(path: string): boolean {
  if (existsSync(path)) {
    return true
  }

  return false
}
