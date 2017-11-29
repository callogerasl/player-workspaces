import doStuff from 'core/do-stuff.js';
import React, {Component} from 'react';
import Button from 'views/Button.view.js';

class App extends Component {
  render() {
    doStuff();

    return <Button />;
  }
}

export default App;
