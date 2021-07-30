import path from 'path'
import cac from 'cac'
import { NONRM, get_items, add_item, remove_item } from './generators'

const cli = cac()

const NONRM_GITUSERCONFIG = path.join(NONRM, 'git_user_config.json')
const NONRM_PMRCONFIG = path.join(NONRM, 'pmr_config.json')

const get_pmr = get_items(NONRM_PMRCONFIG)
const add_pmr = add_item(NONRM_PMRCONFIG)
const remove_pmr = remove_item(NONRM_PMRCONFIG)

const get_gituser = get_items(NONRM_GITUSERCONFIG)
const add_gituser = add_item(NONRM_GITUSERCONFIG)
const remove_gituser = remove_item(NONRM_GITUSERCONFIG)

const start = () => {
  cli.command('ls', 'List all your config').action(() => {})
  cli
    .command('use <registry>', 'Change your package manager registry config')
    .action(registry => {})
  cli
    .command('add <registry> <url> [home]', 'Add a registry')
    .action(async (name, url, home) => {
      addCustomRegistry(name, url, home)
      registries = getAllRegistries()
      await listRegistries(pkgManager)
    })

  cli.command('remove <registry>', 'Remove a custom registry').action(name => {
    removeCustomRegistry(name)
    registries = getAllRegistries()
    await listRegistries(pkgManager)
  })
  cli.command('test', 'Show response time for all registries').action(() => {
    console.log()
    console.log()
  })

  cli.help()
  // cli.version(pkg.version)
  cli.parse()
}
