import React from 'react'
import Card from './components/card'
import { Post, Get } from '@lsky/http-react'
import ChangePath from './components/change-path'

// less
import styles from './app.less'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      lists: [],
      cwd: '/',
      current: '',
      loading: true,
    }

    this.onClick = this.onClick.bind(this)
    this.isDone = this.isLoading.bind(this)
    this.updateCwd = this.formatResponse.bind(this, this.updateCwd)
    this.updateLists = this.updateLists.bind(this)
  }

  updateLists(lists) {
    this.setState({ lists })
  }

  updateCwd(cwd) {
    const { current } = cwd
    this.setState({ cwd: current, current })
  }

  isLoading(flag) {
    this.setState({ loading: flag })
  }

  formatResponse(fn, response) {
    if (!fn || !response) return
    const { status, data, config: { data: dt } } = response
    const ctx = this
    if (status > 300 || status <= 100) return
    const { info } = data
    if (typeof fn === 'function') {
      fn.call(ctx, info, dt)
    }
  }

  onClick(path) {
    this.setState({
      current: path
    })
  }

  render() {
    const { current, loading, lists } = this.state

    return (
      <div className={styles['container']}>
        <h2 className={styles['root']}>Npm Server Manager</h2>
        <Get
          key="cwd"
          url="/path/current"
          onResponse={this.updateCwd}
          onLoading={this.isDone}
        >
          {
            !loading && (
              <ChangePath
                path={current}
                updateLists={this.updateLists}
                onClick={this.onClick}
              ></ChangePath>
            )
          }
          <Card loading={loading} paths={lists}></Card>
        </Get>
      </div>
    )
  }
}

export default App
