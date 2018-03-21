import React, { Component } from "react";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import axios from "axios";
import Post from "./Post/Post";
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    console.log("this is mounted");
    axios.get("https://practiceapi.devmountain.com/api/posts").then(results => {
      console.log(results.data);
      this.setState({ posts: results.data });
    });
    console.log("you there?");
  }
  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  render() {
    console.log("this is rendered");
    const { posts } = this.state;
    var postsMap = posts.map(element => {
      return (
        <Post
          key={element.id}
          text={element.text}
          date={element.date}
          updatePostFn={this.updatePost}
          id={element.id}
          deletePostFn={this.deletePost}
        />
      );
    });
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {postsMap}
        </section>
      </div>
    );
  }
}

export default App;
