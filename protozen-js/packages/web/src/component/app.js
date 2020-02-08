import React, { Component } from 'react';
import Debug from 'debug';

const info = Debug('protozen:info:app');

export default class App extends Component {

  #private1: string;

  constructor() {
    super();
    this.state = {
      helloMessage: 'Let\'s get schwifty!'
    };
    this.#private1 = 'Something private';
  }

  render() {
    return (
      <div>
        <p>Protozen!</p>
        <p>React also says: { this.state.helloMessage }</p>
      </div>
    );
  }

}
