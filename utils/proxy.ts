import fs from 'fs'
import path from 'path'
import execa from 'execa'

const NONRM = path.join(process.env.HOME, '.nonrm')
const NONRM_PROXY = path.join(NONRM, 'proxy.json')
