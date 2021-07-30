import { green, yellow, red } from 'colors'

const getDelayTime = (url: string) => {
  const start = new Date().getMilliseconds()
  return fetch(url)
    .then(() => {
      const time = new Date().getMilliseconds() - start
      const msg = `${time} ms`
      if (time < 500) {
        return green(msg)
      } else if (time < 1000) {
        return yellow(msg)
      } else {
        return red(msg)
      }
    })
    .catch(e => {
      return red('Timeout')
    })
}

const listDelayTime = () => {
  // return await Promise.all(
  //   Object.keys(registries).map(async key => {
  //     const delayTime = await getDelayTime(registries[key].registry)
  //     const item = ` ${dashline(key)} ${delayTime}`
  //     console.log(item)
  //   })
  // )
}

export { listDelayTime }
