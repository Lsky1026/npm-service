import React, { Component } from 'react'
import { Icon } from 'shineout'

const Ic = Icon('//at.alicdn.com/t/font_1969885_rovpfnyq8a.css')

export default class Index extends Component {
  render() {
    const { name, ...others } = this.props
    return (
      <Ic name={`iconfont ${name}`} {...others}></Ic>
    )
  }
}


