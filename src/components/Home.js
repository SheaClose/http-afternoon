import React, { Component } from 'react';
import axios from 'axios';

import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      posts: [
        { title: 'Loading...', image: 'https://unsplash.it/900/400/?random' }
      ]
    };
  }

  componentWillMount() {
    axios
      .get('/api/featured')
      .then(response => {
        this.setState({
          posts: response.data,
          index: ~~(Math.random() * response.data.length) + 0
        });
      })
      .catch(console.log);
  }

  render() {
    const posts = this.state.posts.map((post, i) => {
      return <BlogThumb blog={post} key={i} />;
    });

    return (
      <div className="content">
        <Hero blog={this.state.posts[this.state.index]} />
        <hr />
        <div className="blog-grid">{posts}</div>
      </div>
    );
  }
}

export default Home;
