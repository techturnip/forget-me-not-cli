const img2ascii = require('image-to-ascii')
import * as p from 'path'

export default async function renderAscii(path: string, cb?: Function, options = {size: {width: '35%'}}) {
  return img2ascii(p.resolve(__dirname, path), options,  (err: string, result: string) => {
    if (err) return new Error(err)

    if (cb) return cb(result)
  })
}
