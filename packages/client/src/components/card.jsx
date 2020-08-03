import React, { Component } from 'react'
import { CardGroup } from 'shineout'
import Icon from './icon'

// less
import styles from './style.less'




export default class Path extends Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.renderGroup = this.renderGroup.bind(this)

  }
  renderItem(obj) {
    return (
      <CardGroup.Item key={obj.current}>
        <div className={styles['card-item']}>
          <div className={styles['item-title']}>
            <Icon name="iconxiangmu" className={styles['icon']}></Icon>
            <span className={styles['title']}>{obj.target}</span>
          </div>
        </div>
      </CardGroup.Item>
    )
  }
  renderGroup() {
    const { paths } = this.props
    if (!paths || paths.length < 1) return null
    return (
      <CardGroup>
        {
          paths.map(v => this.renderItem(v))
        }
      </CardGroup>
    )
  }
  render() {
    const { loading } = this.props
    return (
      <div className={styles['card-conainer']}>
        {
          loading ? 'loading...' : this.renderGroup()
        }
      </div>
    )
  }
}
