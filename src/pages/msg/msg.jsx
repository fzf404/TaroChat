import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtCard, AtInput, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

import 'taro-ui/dist/style/components/card.scss'
import "taro-ui/dist/style/components/input.scss"
import "taro-ui/dist/style/components/icon.scss"
import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/loading.scss"
import './msg.scss'

export default class Msg extends Component {

  componentWillMount() {
    this.state = {
      name: '',
      msg: '',
      msgs: []
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.getMessages()
    }, 500)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 获取用户名
  getUserName = () => {
    let that = this;
    Taro.getUserInfo({
      success: function (res) {
        that.setState({ name: res.userInfo.nickName })
      }
    })
  }


  // 获得全部信息
  getMessages = () => {
    let that = this;
    Taro.request({
      url: 'https://service-qze11i97-1257284600.bj.apigw.tencentcs.com/release/chatRoom',
      success: (res) => {
        that.setState({ msgs: res.data.reverse() })
      }
    });
  }

  // 处理发送请求
  handleSend = () => {
    let msg = this.state.msg;
    let name = this.state.name;
    console.log(msg)
    if (msg == '') {
      return
    }
    Taro.request({
      url: `https://service-qze11i97-1257284600.bj.apigw.tencentcs.com/release/chatRoom?msg=${msg}&name=${name}`,
      success: (res) => {
        console.log(res)
      }
    });
    this.getMessages()
  }

  // 处理信息改变
  handleMsgChange = msg => {
    this.setState({
      msg
    })
  }

  // 处理昵称改变
  handleNameChange = name => {
    this.setState({
      name
    })
  }

  // 处理时间
  handleTime = time => {
    let date = new Date(parseInt(time));
    let YY = date.getFullYear() + '/';
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
    let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
    let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return YY + MM + DD + " " + hh + mm + ss
  }

  getAbout = () => {
    Taro.navigateTo({ url: '/pages/index/index' })
  }

  render() {
    const msgs = this.state.msgs
    const msgsItem = []
    msgs.map((item) => {
      if (item.name != this.state.name) {
        let msg = <AtCard
          note={this.handleTime(item.time)}
          title={item.name}
          className='item'
        >{item.msg}
        </AtCard>
        msgsItem.push(msg)
      } else {
        let msg = <AtCard
          note={this.handleTime(item.time)}
          title={item.name}
          className='item-me'
        >{item.msg}
        </AtCard>
        msgsItem.push(msg)
      }
    })
    return (
      <View className='index'>
        <AtInput
          title='昵称'
          type='text'
          placeholder='Your Fake Name'
          value={this.state.name}
          onChange={this.handleNameChange}
          className='input'
        >
          <AtButton openType='getUserInfo' onClick={this.getUserName} size='small'>获取</AtButton>
        </AtInput>
        <AtInput
          name='input'
          type='text'
          placeholder='message'
          value={this.state.msg}
          onChange={this.handleMsgChange}
          className='input'
        >
          <AtButton size='small' onClick={this.handleSend}>发送</AtButton>
        </AtInput>
        {msgsItem}
        <AtButton size='small' onClick={this.getAbout}>关于</AtButton>
      </View>
    )
  }
}
