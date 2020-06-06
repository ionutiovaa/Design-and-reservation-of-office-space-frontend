import React from 'react';
import { Header, Button, Left, Body, Icon } from 'native-base';

interface IPropsCustomHeader {
  titleText: string;
  navigation: any;
  isDisabledDrawer?: boolean;
}

export default class CustomHeader extends React.Component<
  IPropsCustomHeader,
  any
  > {
  constructor(props: IPropsCustomHeader) {
    super(props);
  }

  render() {
    return (
      <Header style={{ backgroundColor: '#3f4194' }}>
        {!this.props.isDisabledDrawer && (
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
        )}
        <Body>{this.props.children}</Body>
      </Header>
    );
  }
}
