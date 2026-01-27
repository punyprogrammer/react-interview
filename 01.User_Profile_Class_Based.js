import React, { Component } from "react";
import "./styles.css";

const user = {
  name: "Jane Doe",
  bio: "Frontend developer who loves React and coffee ☕️",
  image: "https://do6gp1uxl3luu.cloudfront.net/question-webp/dummyUser.jpg"
};

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBio: false
    };
  }

  toggleBio = () => {
    this.setState(prev => ({ showBio: !prev.showBio }));
  };

  render() {
    const { name, bio, image } = user;
    const { showBio } = this.state;

    return (
      <div className="user-profile">
        <img src={image} alt={`${name}'s profile`} className="profile-img" />
        <h2>{name}</h2>

        <button onClick={this.toggleBio}>
          {showBio ? "Hide Bio" : "Show Bio"}
        </button>

        {showBio && <p>{bio}</p>}
      </div>
    );
  }
}

export default UserProfile;
