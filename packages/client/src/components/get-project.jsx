import React, { Component } from 'react'
import { Post } from '@lsky/http-react'
import Path from './path'

export default class GetProjects extends Component {
  constructor(props) {
    super(props)
    const { path } = this.props
    this.state = {
      loading: true,
      arr: this.handleSinglePath(path)
    }
    this.loading = this.loading.bind(this)
    this.handleSinglePath = this.handleSinglePath.bind(this)
    this.onResponse = this.onResponse.bind(this)

    this.unmount = false
  }

  componentDidUpdate(prevProps) {
    const { path } = this.props
    if (prevProps.path !== path) {
      this.setState({ arr: this.handleSinglePath(path) })
    }
  }

  componentWillUnmount() {
    this.unmount = true
  }

  handleSinglePath(path) {
    if (!path) return []
    let str = ''
    let t = path.replace('/', '').split('/')
    return t.reduce((acc, cur) => {
      str += `/${cur}`
      acc.push({
        target: cur,
        current: str
      })
      return acc
    }, [])
  }

  loading(flag) {
    if (this.unmount) return
    this.setState({
      loading: flag
    })
  }

  onResponse(response) {
    const { updateLists } = this.props
    const { status, data } = response
    if (status > 300 || status <= 100) return
    if (typeof updateLists === 'function') updateLists(data.info)
  }

  render() {
    const { onClick, path, lists } = this.props
    const { arr, loading } = this.state
    if (!path) return null
    return (
      <Post
        key="get-project"
        url="/npm/getProjects"
        data={{ path }}
        onResponse={this.onResponse}
        onLoading={this.loading}
      >
        {!loading && <Path paths={arr} lists={lists} onClick={onClick}></Path>}
      </Post>
    )
  }
}
