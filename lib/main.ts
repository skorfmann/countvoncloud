import * as floyd from 'iam-floyd'
import * as path from 'path'
import * as fs from 'fs'

const actions = []

for (const obj in floyd) {
  try {
    const foo:any = eval(`new floyd.${obj}()`)
    for (const actionKey of Object.keys(foo.actions)) {
      const action = foo.actions[actionKey]
      actions.push(Object.assign({}, action, {
        servicePrefix: foo.servicePrefix,
        name: actionKey,
        fqn: `${foo.servicePrefix}:${actionKey}`
      }))
    }
  } catch(e) {
    console.log(`error: ${e}`)
  }
}

fs.writeFileSync(path.join(process.cwd(), 'actions.json'), JSON.stringify(actions, null, 2))