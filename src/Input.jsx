import React, { Component } from 'react'
import { Numbers, SpecialChar, UpperCaseChar, LowerCaseChar } from './Characters'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import './Input.css'

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: 0,
      isNumber: false,
      isSpecialChar: false,
      isUpperCase: false,
      isLowerCase: false,
      result: ''
    }
    this.inputHandler = this.inputHandler.bind(this)
    this.ChangeText = this.ChangeText.bind(this)
    this.generatePassword = this.generatePassword.bind(this)
  }
  inputHandler = (e) => {
    this.setState({
      input: e.target.value
    })
  }
  generatePassword = (e) => {
    let i;
    let password=''
    const { isNumber, isSpecialChar, isUpperCase, isLowerCase,input} = this.state
    if (!isNumber && !isSpecialChar && !isUpperCase && !isLowerCase) {
      alert('please choose one checkbox')
    } else {
      let char = ''
      if (isNumber) {
        char += char + Numbers
      }
      if (isSpecialChar) {
        char += char + SpecialChar
      }
      if (isUpperCase) {
        char += char + UpperCaseChar
      }
      if (isLowerCase) {
        char += char + LowerCaseChar
      }
      let charIndex;
      for(i=0;i<input;i++){
        charIndex=Math.round(Math.random()*char.length)
        password+=char.charAt(charIndex)
      }
      this.setState({
        result:password
      })
    }
  }
  ChangeText() {
    const button = document.getElementById('copiedButton')
    console.log(button)
    button.innerText = 'COPIED ✔'
    setTimeout(()=>{button.innerText = 'COPY 📋'},1000)
    console.log('copied')
  }
  render() {
    return (
      <div className='main-container'>
        <div className='main-heading'>
          <h2>Your Password :</h2>
        </div>
        <div className='copy-heading'>
          <h3 className='result-heading'>{this.state.result}</h3>
          <CopyToClipboard text={this.state.result}>
          <button id='copiedButton' onClick={this.ChangeText}>COPY 📋</button>
        </CopyToClipboard>
        </div>
        <div>
          <div className='password-container'>
            <div>
              <input type='number' placeholder='Password Length (eg.10)' onChange={this.inputHandler} required min='8' className='number-input'/>
            </div>
            <div>
              <input type='checkbox' name='numbers' checked={this.state.isNumber} onChange={(e) => this.setState({ isNumber: e.target.checked })
              } />
              <label for='numbers'>Number</label>
            </div>
            <div>
              <input type='checkbox' name='special-characters' checked={this.state.isSpecialChar} onChange={e => this.setState({ isSpecialChar: e.target.checked })} />
              <label for='special-characters'>Special-Characters</label>
            </div>
            <div>
              <input type='checkbox' name='Upper-case' checked={this.state.isUpperCase} onChange={e => this.setState({ isUpperCase: e.target.checked })} />
              <label for='Upper-case'>Upper-Case Characters</label>
            </div>
            <div>
              <input type='checkbox' name='Lower-case' checked={this.state.isLowerCase} onChange={e => this.setState({ isLowerCase: e.target.checked })} />
              <label for='Lower-case'>Lower-Case-characters</label>
            </div>
            <div className='generate-container'>
              <button type='submit' onClick={this.generatePassword} className='generate-button'>Generate Password</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Input;