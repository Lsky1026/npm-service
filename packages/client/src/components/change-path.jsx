import React, { Component } from 'react'
import { Post } from '@lsky/http-react'
import GetProjects from './get-project'

export default class ChangePath extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      lists: []
    }
    this.isLoading = this.isLoading.bind(this)
    this.onResponse = this.onResponse.bind(this)

    this.unmount = false
  }
  // componentDidMount() {
  //   this.unmount = false
  // }

  componentWillUnmount() {
    this.unmount = true
  }

  isLoading(loading) {
    this.setState({ loading })
  }

  onResponse(response) {
    const { status, data } = response
    if (status > 300 || status <= 100) return


    if (this.unmount) return

    this.setState({
      lists: data.info
    })
  }

  render() {
    const { onClick, path, updateLists } = this.props
    const { loading, lists } = this.state
    if (!path) return null
    return (
      <Post
        key="list"
        url="/path/changePath"
        data={{ path }}
        onResponse={this.onResponse}
        onLoading={this.isLoading}
      >
        {
          !loading && <GetProjects path={path} lists={lists} updateLists={updateLists} onClick={onClick}></GetProjects>
        }
      </Post>
    )
  }
}
