import React, { Component} from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import './App.css';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBk0kiiFRbwyPcKKY6CwHvKAV0wOg2M0l4",
  authDomain: "bloc-chat-7c769.firebaseapp.com",
  databaseURL: "https://bloc-chat-7c769.firebaseio.com",
  projectId: "bloc-chat-7c769",
  storageBucket: "bloc-chat-7c769.appspot.com",
  messagingSenderId: "596692860351",
  appId: "1:596692860351:web:b25a663f14189c8a"
};

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {activeRoom: ""};
    this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room) {
    this.setState({ activeRoom: room })
  }

  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div className="App">
      <h1>{this.state.activeRoom.title || "Choose a Room"}</h1>
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        { showMessages ?
          (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
          : (null)
        }
      </div>
    );
  }
}

export default App;
