import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

interface IScButtonProps {
  onClick(): void;
  text: string;
  color?: string;
  width?: number;
}

export default class ScButton extends React.Component<IScButtonProps, any> {
  constructor(props: IScButtonProps) {
    super(props);
  }

  render() {
    return (
      <View style={{ padding: 5 }}>
        <TouchableHighlight
          style={[
            styles.sgButton,
            { backgroundColor: this.props.color || '#3f4194', width: this.props.width || 160 },
          ]}
          onPress={() => this.props.onClick()}>
          <Text style={styles.sgButtonText}>{this.props.text}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sgButton: {
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  sgButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
