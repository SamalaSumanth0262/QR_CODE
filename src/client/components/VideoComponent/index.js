/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from "react";
import { getTwilioAccessToken } from "./client.js";
import Video from "twilio-video";
import Button from "../common/Button";
import "./styles.scss";
import { setActivity } from '../../Actions/ActivityActions';
import { connect } from 'react-redux';
class VideoComponent extends React.Component {
  state = {
    identity: null,
    roomName: "",
    roomNameErr: false,
    previewTracks: null,
    localMediaAvailable: false,
    hasJoinedRoom: false,
    activeRoom: null
  };

  // Attach the Tracks to the DOM.
  attachTracks(tracks, container) {
    tracks.forEach(track => {
      container.appendChild(track.attach());
    });
  }
  // https://github.com/twilio/twilio-video.js/issues/497
  getTracks(participant) {
    return Array.from(participant.tracks.values()).filter(function (publication) {
      return publication.track;
    }).map(function (publication) {
      return publication.track;
    });
  }
  // Attach the Participant's Tracks to the DOM.
  attachParticipantTracks(participant, container) {
    var tracks = this.getTracks(participant);
    this.attachTracks(tracks, container);
  }

  roomJoined = room => {
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true
    });
    var previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector("video")) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    room.participants.forEach(participant => {
      console.log("Already in Room: '" + participant.identity + "'");
      var previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // Participant joining room
    room.on('participantConnected', participant => {
      this.props.dispatch(setActivity(`Participant "${participant.identity}" connected`))
      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          const track = publication.track;
          document.getElementById('remote-media-div').appendChild(track.attach());
        }
      });

      participant.on('trackSubscribed', track => {
        document.getElementById('remote-media-div').appendChild(track.attach());
      });
    });

    // Attach participant’s tracks to DOM when they add a track
    room.on("trackAdded", (track, participant) => {
      var previewContainer = this.refs.remoteMedia;
      this.attachTracks(track, previewContainer);
    });

    // Detach all participant’s track when they leave a room.
    room.on("participantDisconnected", participant => {
      this.props.dispatch(setActivity(`Participant "${participant.identity}" disconnected`))
      participant.tracks.forEach(publication => {
        const attachedElements = publication.track.detach();
        attachedElements.forEach(element => element.remove());
      });
    });

    // Once the local participant leaves the room, detach the Tracks
    // of all other participants, including that of the LocalParticipant.
    room.on("disconnected", (room) => {
      // Detach the local media elements
      room.localParticipant.tracks.forEach(publication => {
        const attachedElements = publication.track.detach();
        attachedElements.forEach(element => element.remove());
      });

      this.state.activeRoom = null;
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    });
  };

  async componentDidMount() {
    var data = await getTwilioAccessToken();
    const { identity, token } = data;
    this.setState({ identity, token });
  }

  handleRoomNameChange(e) {
    let roomName = e.currentTarget.value;
    this.setState({ roomName });
  }

  joinRoom() {
    if (!this.state.roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }
    let connectOptions = {
      name: this.state.roomName,
      RecordParticipantsOnConnect: true
    };
    Video.connect(this.state.token, connectOptions).then(
      this.roomJoined,
      error => {
        console.log("VideoComponent -> joinRoom -> error", error);
      }
    );
  }

  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  }

  detachTracks(tracks) {
    tracks.forEach(track => {
      track.detach().forEach(detachedElement => {
        detachedElement.remove();
      });
    });
  }

  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);

  }

  render() {
    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
      <Button
        text="Leave Room"
        secondary={true}
        onClick={() => {
          this.leaveRoom();
        }}
        className="btn btn-primary btn-block red-button ml-3 mt-3 mb-3"
      />
    ) : (
        <Button
          text="Join Room"
          primary={true}
          onClick={() => {
            this.joinRoom();
          }}
          className="btn btn-primary btn-block ml-3 mt-3 mb-3"
        />
      );
    return (
      <div className="FlexContainer">
        <div className="flex-container p-3">
          <div className="flex-item video" id="video">
            <div ref="localMedia" />{" "}
          </div>
          <div className="flex-item">
            <div className="inline-flex">
              <input
                hintText="Room Name"
                onChange={e => {
                  this.handleRoomNameChange(e);
                }}
                errorText={
                  this.state.roomNameErr ? "Room Name is required" : undefined
                }
                className="mt-3"
                placeholder="Please Enter the Room Name"
              />
              <br />
              {joinOrLeaveRoomButton}
            </div>
          </div>
          <div className="flex-item" ref="remoteMedia" id="remote-media" />
        </div>
        <div className="remoteVideoFlex pt-3 mr-3 pb-3">
          <div className="remoteVideo" ref="remoteMedia" id="remote-media-div" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nothing: null
  }
}

export default connect(mapStateToProps)(VideoComponent);
