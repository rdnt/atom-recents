/** @babel */

import { CompositeDisposable } from 'atom'

let View

const VIEW_URI = 'atom://recents/view'

export default class Recents {
  constructor() {}

  async activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(
      atom.workspace.addOpener(filePath => {
        if (filePath === VIEW_URI) {
          return this.createView({ uri: VIEW_URI })
        }
      })
    )

    this.subscriptions.add(
      atom.commands.add('atom-workspace', 'recents:show', () => this.show())
    )

    if (atom.config.get('recents.showOnStartup')) {
      await this.show()
    }
  }

  show() {
    return Promise.all([atom.workspace.open(VIEW_URI)])
  }

  deactivate() {
    this.subscriptions.dispose()
  }

  createView(state) {
    if (View == null) View = require('./view')
    return new View({ ...state })
  }
}
