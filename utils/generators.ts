import fs from 'fs'
import path from 'path'
import execa from 'execa'
import colors from 'colors'

const { rainbow } = colors

const NONRM = path.join(process.env.HOME, '.nonrm')

const set_item = (item_config_path: string) => (item_config: any) =>
  fs.writeFileSync(item_config_path, JSON.stringify(item_config, null, 2))

const get_items = (item_config_path: string) => async () => {
  let item_config = {}
  try {
    item_config = require(item_config_path)
  } catch (e) {
    const msg = `\nWe will create '${rainbow(
      item_config_path
    )}' to record your custom config.\n`
    console.log(msg)

    if (fs.existsSync(NONRM) === false) {
      try {
        fs.mkdirSync(NONRM, { recursive: true })
      } catch (e: any) {
        console.log(e.message)
        await execa('mkdir', [NONRM]).catch((e: Error) => {
          console.log(e.message)
        })
      }
    }
    set_item(item_config_path)(item_config)
  }
  return item_config
}

const add_item =
  (item_config_path: string) => (key: string, key_1: string, key_2: string) => {
    const item_config = get_items(item_config_path)
    item_config[key] = {
      key_1,
      key_2
    }
    set_item(item_config_path)(item_config)
  }

const remove_item = (item_config_path: string) => (name: string) => {
  const item_config = get_items(item_config_path)
  delete item_config[name]
  set_item(item_config_path)(item_config)
}

export { NONRM, get_items, add_item, remove_item }
