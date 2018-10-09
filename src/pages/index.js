import React from 'react'
// import { Link } from 'gatsby'
import styles from './styles.module.css'
import Layout from '../components/layout'

import Firebase from 'firebase';

const FireApp = Firebase.initializeApp({
  apiKey: "AIzaSyBnLd9pQFGG9rCyXneRDNqGj5Am7i_FVO4",
  authDomain: "minislack-22233.firebaseapp.com",
  databaseURL: "https://minislack-22233.firebaseio.com",
  projectId: "minislack-22233",
  storageBucket: "",
  messagingSenderId: "242913631929"
})

const Firestore = FireApp.firestore();
Firestore.settings({timestampsInSnapshots: true})


class Main extends React.Component{
  constructor(){
    super();
    this.state={
      inputVal: '',
      list: []
    }
  }

  componentDidMount() {
    Firestore.collection('messages')
      .onSnapshot(snap => {
        this.setState({
          list: snap.docs.map(doc => {
            return {
              ...doc.data()
            }
          })
        })
      })
  }

  onChange =(data)=>{
    this.setState({
      inputVal: data.target.value
    })
  }
  getColumnsFromObject = obj => {
    return Object.keys(obj).map(x => (
      x === 'message' ? <td>{obj[x]}</td> : false
    ))
  }
  onEnter = event => {
    if (event.keyCode === 13) {
      if(this.state.inputVal){
        Firestore.collection('messages')
      .add({
        message: this.state.inputVal,
        target: this.props.target
      })
      }
    }
  }
  render(){
    return(
      <div className={styles.main}>
        <input type='text' onChange={this.onChange} onKeyDown={this.onEnter} placeholder={'Message #'+this.props.target}></input>
        <table className={styles.messages}>
          {
             this.state.list.filter(m => m.target === this.props.target)
              .map(x => <tr>{this.getColumnsFromObject(x)}</tr>)
          }
        </table>
      </div>
    )
  }
}

class SideBar extends React.Component{
  constructor(){
    super();
    this.state={
      target: 'bootcamp'
    }

  }
  bootcamp = () => {
    this.setState({
      target: 'bootcamp'
    })
  }
  extraNotes = () => {
    this.setState({
      target: 'extraNotes'
    })
  }
  general = () => {
    this.setState({
      target: 'general'
    })
  }
  me = () => {
    this.setState({
      target: 'Mohammed Ameen (you)'
    })
  }
  ahmed = () => {
    this.setState({
      target: 'Ahmed'
    })
  }
  bestun = () => {
    this.setState({
      target: 'Bestun'
    })
  }
  khalid = () => {
    this.setState({
      target: 'Khalid'
    })
  }
  kirmanj = () => {
    this.setState({
      target: 'Kirmanj'
    })
  }
  mabast = () => {
    this.setState({
      target: 'Mabast'
    })
  }
  render(){
    return(
      <div>
        <div className={styles.sideBar}>
        <div className={styles.title}>
          <h1>Re:Coded Web ...</h1>
          <p>Mohammed Ameen</p>
        </div>
        <input placeholder='Jump to...'></input>
        <button>All Threads</button>

        <p>Channels</p>
        <button onClick={this.bootcamp}># bootcamp</button>
        <button onClick={this.extraNotes}># extra-notes</button>
        <button onClick={this.general}># general</button>

        <p>Direct Messages</p>
        <button onClick={this.me}>0 Mohammed Ameen (you)</button>
        <button onClick={this.ahmed}>0 Ahmed</button>
        <button onClick={this.bestun}>0 Bestun</button>
        <button onClick={this.khalid}>0 Khalid</button>
        <button onClick={this.kirmanj}>0 Kirmanj</button>
        <button onClick={this.mabast}>0 mabast</button>
      </div>
      <Main target={this.state.target}/>
      </div>
    )
  }
}

const IndexPage = () => (
  <Layout>
    <SideBar />
  </Layout>
)

export default IndexPage
