import React from 'react';
import { Text } from 'native-base';
import {TouchableNativeFeedback, View} from 'react-native';

import styles from './styles/NavMenuStyle';

interface IPropsNavMenuItem {
    sectionItemText: string;
    iconName: string;
    iconClass: string;
    onClick(): void;
}

export default class DrawerItem extends React.Component<any, IPropsNavMenuItem> {
    constructor(props: IPropsNavMenuItem){
        super(props);
    }

    render(){
        const iconSize: number = 18;
        const iconColor: string = 'white';
        return(
            
            <View>
                
                <TouchableNativeFeedback
                    onPress={() => this.props.onClick()}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <Text style={[styles.navMenuButtonText, styles.textFormat]}>{this.props.sectionItemText}</Text>
                </TouchableNativeFeedback>
            </View>
        )
    }

}