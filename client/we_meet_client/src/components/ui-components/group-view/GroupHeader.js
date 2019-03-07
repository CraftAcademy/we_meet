import React, {Component} from "react";
import { FillButton } from 'tailwind-react-ui';
import axios from "axios";
import EventForm from '../../Events/EventForm'
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    isSignedIn: state.reduxTokenAuth.currentUser.isSignedIn,
    currentUser: state.reduxTokenAuth.currentUser
  }
}

class GroupHeader extends Component {
  state = {
    showCreateEventForm: false,
    navBarNotification: ''
  }

  async joinGroup() {
    const credentials = { 
      'access-token': localStorage.getItem('access-token'), 
      'token-type': localStorage.getItem('token-type'), 
      'client': localStorage.getItem('client'), 
      'expiry': localStorage.getItem('expiry'), 
      'uid': localStorage.getItem('uid')
    }
    const response = await axios.post(`http://localhost:3000/groups/${this.props.group.id}/memberships`, {}, { headers: credentials }) 
  }

  showCreateEventForm = () => {
    this.setState({ showCreateEventForm: true })
  }

  hideCreateEventForm=() => {
    this.setState({ showCreateEventForm: false })
  }

  createEventHandler = async(event) => {
    const credentials = {
     'access-token': localStorage.getItem('access-token'),
     'token-type': localStorage.getItem('token-type'),
     'client': localStorage.getItem('client'),
     'expiry': localStorage.getItem('expiry'),
     'uid': localStorage.getItem('uid'),
    }
    const response = await axios.post(`http://localhost:3000/groups/${this.props.group.id}/events`, { event }, { headers: credentials})
    this.setState({ navBarNotification: response.data.message, showCreateEventForm: false })
  }


  render() {
    const isSignedIn = this.props.isSignedIn;
    const currentUser = this.props.currentUser;
    let group = this.props.group;    
    let createEventLink, eventForm
    
    if (isSignedIn && currentUser.attributes.id === group.organizer.id) {
      createEventLink = (
        <FillButton
          onClick={this.showCreateEventForm}
          brand='secondary'
          large
          style={{ position:"absolute", right:"16.5rem", width:"300px", marginTop:"15rem", fontSize:"24px"}}
        >
          Create event
        </FillButton>);
    }

    eventForm = this.state.showCreateEventForm && <EventForm hideCreateEventForm={ this.hideCreateEventForm} createEventHandler={this.createEventHandler}/>

    return (
      <>
        <div style={{ height:"400px", borderTop: "2px solid rgba(0,0,0,.12)", borderBottom: "1px solid rgba(0,0,0,.12)"}}>
            <h1 style={{ fontSize: "2.75rem", position:"absolute", right:"15rem", marginTop:"1.5rem" }}>{group.name}</h1>
            <div>
              <img
                src={group.image_url}
                style={{
                  height: "300px",
                  border: "1px solid rgba(0,0,0,.12)",
                  borderRadius: "30px",
                  position: "absolute",
                  marginTop: "1.5rem",
                  marginLeft: "7rem"
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                right: "25.5rem",
                marginTop: "5rem",
                fontWeight: "400",
                lineHeight: "1.5",
                marginBottom: "1rem",
                marginLeft: "3.2rem"
              }}
            >
              <p>
                Organized by{" "}
                <span style={{ fontWeight: "bold", color: "teal" }}>
                  {group.organizer.name}
                </span>
              </p>
              <p>
                Group in{" "}
                <span style={{ fontWeight: "bold", color: "teal" }}>
                  {group.location}
                </span>
              </p>
            </div>
            <div>
              <FillButton
                  onClick={this.joinGroup.bind(this)}
                  brand='primary'
                  large
                  style={{ position:"absolute", right:"16.5rem", width:"300px", marginTop:"10rem", fontSize:"24px"}}
                >
                  Join group
              </FillButton>

              { createEventLink }

              { eventForm }
              
              { this.state.navBarNotification}

            </div>
        </div>
      </>
    );
  }
  
};

export default connect(mapStateToProps)(GroupHeader);
