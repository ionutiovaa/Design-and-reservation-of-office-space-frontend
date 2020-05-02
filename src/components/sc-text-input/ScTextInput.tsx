import React from 'react';
import {StyleSheet, View, TextInput, KeyboardTypeOptions} from 'react-native';
import {Icon} from 'react-native-elements';

interface IScTextInputProps {
  placeHolder?: string;
  onChangeText?(e: any): void;
  icon?: string;
  width?: number;
  bgColor?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  value: string;
}

export default class ScTextInput extends React.Component<
  IScTextInputProps,
  any
> {
  constructor(props: IScTextInputProps) {
    super(props);
  }

  render() {
    return (
      <View style={{padding: 5}}>
        <View
          style={[
            styles.scInputTextView,
            {
              backgroundColor:
                this.props.editable == false
                  ? '#C0C0C0'
                  : this.props.bgColor || 'white',
            },
          ]}>
          <TextInput
            blurOnSubmit={true}
            style={styles.scInputText}
            placeholder={this.props.placeHolder}
            onChangeText={this.props.onChangeText}
            keyboardType={this.props.keyboardType || 'default'}
            underlineColorAndroid="transparent"
            value={this.props.value ? this.props.value : ''}
            secureTextEntry={this.props.secureTextEntry || false}
            editable={!this.props.editable ? this.props.editable : true}
          />
          <Icon name={this.props.icon || 'help'} size={25} color="#000" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scInputTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
  },
  scInputText: {
    flex: 1,
    color: '#424242',
    padding: 10,
    borderRadius: 12,
  },
});
