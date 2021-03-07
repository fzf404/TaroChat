import React, { Component } from 'react'
import { View } from '@tarojs/components'

import "taro-ui/dist/style/components/article.scss";
import './index.scss'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='at-article'>
        <View className='at-article__h1'>
          关于
        </View>
        <View className='at-article__info'>
          2021-02-23&nbsp;&nbsp;&nbsp;fzf
        </View>
        <View className='at-article__content'>
          <View className='at-article__section'>
            <View className='at-article__h2'>这是什么</View>
            <View className='at-article__p'>
              一个匿名的在线聊天室
            </View>
          </View>
        </View>
      </View>
    )
  }
}
