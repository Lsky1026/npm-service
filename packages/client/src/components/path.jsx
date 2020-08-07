import React, { Component } from 'react'
import { Button, Select } from 'shineout'
import Icon from './icon'

// less
import styles from './style.less'



export default class Path extends Component {
  constructor(props) {
    super(props)
    this.renderPath = this.renderPath.bind(this)
  }

  handleClick(target) {
    const { onClick } = this.props
    if (typeof onClick === 'function') onClick(target)
  }

  renderPath() {
    const { paths } = this.props
    if (!paths || paths.length < 1) return null
    return paths.map(v => <Button className={styles['fix-button-margin']} type="default" key={v.current} onClick={this.handleClick.bind(this, v.current)}>{v.target}</Button>)
  }

  render() {
    const { lists = [] } = this.props
    return (
      <div className={styles['path-container']}>
        <Button className={styles['fix-button-margin']} type="default" key="up"><Icon name="iconup"></Icon></Button>
        <Button className={styles['fix-button-margin']} type="default" key="iconfolder"><Icon name="iconfolder"></Icon></Button>
        {this.renderPath()}
        <Select
          style={{ marginLeft: 4 }}
          data={lists}
          keygen="current"
          renderItem="target"
          format="current"
          width={160}
          onChange={this.handleClick.bind(this)}
        ></Select>
      </div>
    )
  }
}
