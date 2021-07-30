import fs from 'fs'
import path from 'path'
import execa from 'execa'

const NONRM = path.join(process.env.HOME, '.nonrm')
const NONRM_REGISTRIES = path.join(NONRM, 'registries.json')

const setCustomRegistries = (registries: any) =>
  fs.writeFileSync(NONRM_REGISTRIES, JSON.stringify(registries, null, 2))

const getCustomRegistries = async () => {
  let customRegistries = {}
  try {
    customRegistries = require(NONRM_REGISTRIES)
  } catch (e) {
    // const msg = `\nWe will create '${green(
    //   NONRM_REGISTRIES
    // )}' to record your custom registries.\n`
    // console.log(msg)

    if (fs.existsSync(NONRM) === false) {
      try {
        fs.mkdirSync(NONRM, { recursive: true })
      } catch (e) {
        console.log(e.message)
        await execa('mkdir', [NONRM]).catch(e => {
          console.log(e.message)
        })
      }
    }
    setCustomRegistries(customRegistries)
  }
  return customRegistries
}

/**
 *
 * @param name
 * @param home
 * @param url
 */
const addCustomRegistry = (name: string, home: string, url: string) => {
  const customRegistries = getCustomRegistries()
  if (url.endsWith('/') === false) url += '/'
  customRegistries[name] = {
    home,
    registry: url
  }
  setCustomRegistries(customRegistries)
}

/**
 * remove custome registry for supplied name
 * @param name
 */
function removeCustomRegistry(name: string) {
  const customRegistries = getCustomRegistries()
  delete customRegistries[name]
  setCustomRegistries(customRegistries)
}

export { getCustomRegistries, addCustomRegistry, removeCustomRegistry }
