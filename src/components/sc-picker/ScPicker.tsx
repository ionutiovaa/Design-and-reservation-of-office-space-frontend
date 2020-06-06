import React from 'react';
import { StyleSheet, Picker } from 'react-native';

interface IScPickerProps {
  selectedValue?: string;
  onChangeValue(e: any): void;
  pickerItems: string[];
  colorText?: string;
}

export default class ScPicker extends React.Component<IScPickerProps, any> {
  constructor(props: IScPickerProps) {
    super(props);
  }

  private changeSelectedItem(item: string) {
    this.props.onChangeValue(item);
    this.setState({
      selectedItem: item,
    });
  }

  render() {
    const styles = StyleSheet.create({
      scPicker: {
        flexDirection: 'row',
        paddingLeft: 100,
        color: this.props.colorText ? this.props.colorText : '#3f4194',
      },
    });
    return (
      <Picker
        selectedValue={this.props.selectedValue || this.props.pickerItems[0]}
        style={styles.scPicker}
        onValueChange={e => this.changeSelectedItem(e)}>
        {this.props.pickerItems.map(key => {
          return <Picker.Item label={key} value={key} />;
        })}
      </Picker>
    );
  }
}
