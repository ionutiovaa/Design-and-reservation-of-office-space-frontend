import React from 'react';
import { Root } from 'native-base';

import Routes from './src/routes/route';


export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Root>
        <Routes />
      </Root>
    );
  }
}
