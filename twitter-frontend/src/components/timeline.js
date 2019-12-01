import React, { Component } from 'react';

import SearchBar from './searchBar';
import ScrollButton from './scrollButton';

import './styles.css';

const BASE_URL = 'http://localhost:9000/twitter/'; //backend url
const UPDATE_FREQUENCY = 5000; //twiiter handle tweets refresh frequency
const LIMIT = '50'; //tweets limit

class Timeline extends Component {
  constructor(props) {
    super(props);
      this.state = {
        screenName:'',
        results:[]
      };
      let intervalId = 0;
  }

  componentDidMount = () => {
    this.getTimeline();
  }

  getTimeline = async () => {
    clearInterval(this.intervalId); //stop automatic UI updates
    const res = await fetch(BASE_URL + 'timeline?limit=' + LIMIT);
    const results = await res.json();
    this.setState({
      results:results,
      screenName:''
    });
  }

  getUserTimeline = async (name) => {
      const res = await fetch(`${BASE_URL}users?name=${name === undefined ? encodeURIComponent(this.state.screenName):encodeURIComponent(name)}&limit=${LIMIT}`);
      const results = await res.json();
      this.setState({
        results:results,
        screenName:results.length === 0 || results['error'] !== undefined? '' :results[0].user.screen_name
      })
  }

  searchUserTweets = async (query) => {
    const res = await fetch(`${BASE_URL}users?keyword=${encodeURIComponent(query)}&name=${encodeURIComponent(this.state.screenName)}&limit=${LIMIT}`);
    const results = await res.json();
    this.setState({
      results:results
    });
  }

  handleKeyPress = (query) => {
    if (this.state.screenName === '') {
      this.getUserTimeline(query);
      this.intervalId = setInterval(this.getUserTimeline,UPDATE_FREQUENCY); //update user feed periodically
    } else {
      clearInterval(this.intervalId);
      this.searchUserTweets(query);
    }
  }

  renderResults = () => {
    //display results
    let results = this.state.results;
    if (results === undefined || results.error !== undefined) { //error handling
      return (
        <h3>
        Something went wrong with the server
        </h3>
      )
    }
    if (results.length === 0) {
      return (
        <h3>
        No results
        </h3>
      )
    }
    let list = results.map((data,index) => {
        let date = data.created_at.split(' ');
        const year = date.pop();
        date.pop();
        date.push(year);
        return (
          <li className = "tweet-container" key={index}>
            <div className = "tweet-box">
              <div className = "tweet-box-user">
                <img src={data.user.profile_image_url_https} alt={data.user.screen_name} className="tweet-box-user-image" />
                <p className = "tweet-box-user-name">{data.user.screen_name}</p>
              </div>
              <div className = "tweet-box-text">
                <p>{data.text}</p>
              </div>
            </div>
            <div className = "tweet-box-date">
              <p>{date.join(' ')}</p>
            </div>
          </li>
        )
    })
    return list;
  }

  render() {
    return (
      <div>
        <ScrollButton
          scrollStepInPx="300"
          delayInMs="5"
          getTimeline={this.getTimeline}
          home={true}
          />
        <h3>
          {this.state.screenName === '' ? "Search Username" : "Search for tweets in " + this.state.screenName}
        </h3>
        <SearchBar
          handleKeyPress = {this.handleKeyPress}
          />
        {
          this.state.results !== [] ?
          <ul className = "list">
            {this.renderResults()}
          </ul>
          :
          null
        }
        <ScrollButton
          scrollStepInPx="300"
          delayInMs="5"
          />
      </div>
    );
  }
}

export default Timeline;
