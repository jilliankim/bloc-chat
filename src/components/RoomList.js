import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: "",
        rooms: [],
    };

  this.roomsRef = this.props.firebase.database().ref('rooms');
  this.handleChange = this.handleChange.bind(this);
  this.createRoom = this.createRoom.bind(this);

  }

    handleChange(e){
      this.setState({ name: e.target.value })
    }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
      });
    }

    selectRoom(room) {
      this.props.activeRoom(room);
    }


    createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.name });
    this.setState({name: ""})
    }

    render(){
      const roomList = this.state.rooms.map((room) =>
      <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}</li>);
      const newRoom = (
      <form onSubmit={this.createRoom}>
        <input type="text" value={this.state.name} onChange={this.handleChange} placeholder="Create new chat room"  />
        <input type="submit" value="Start Chat"/>
      </form>
    );
      return(
        <section>
          <div>{newRoom}</div>
          <ul>{roomList}</ul>
        </section>

      );
      //second checkpoint create room


    }
}
export default RoomList;