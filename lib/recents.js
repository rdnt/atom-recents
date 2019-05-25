/** @babel */

import { CompositeDisposable } from 'atom'

let RecentsView

const VIEW_URI = 'atom://recents/view'

export default class Recents {

  async activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(
      atom.workspace.addOpener(uri => {
        if (uri === VIEW_URI) {
          return this.createView({ uri: VIEW_URI })
        }
      })
    )

    this.subscriptions.add(
      atom.commands.add('atom-workspace', 'recents:view', async => {
        this.show()
      })
    )

    if (atom.config.get('recents.showOnStartup')) {
      await this.show()
    }
  }

  deactivate() {
    this.subscriptions.dispose()
  }

  createView(state) {
    if (RecentsView == null) RecentsView = require('./view')
    return new RecentsView(state)
  }

  show() {
    return Promise.all([
      atom.workspace.open(VIEW_URI, {
        searchAllPanes: true
      })
    ])
  }

}
