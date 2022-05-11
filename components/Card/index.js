import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Card.component.style';

const Card = (props) => {
  return (
    <View style={styles.container}>
        <View style={styles.detailContainer}>
            <Text style={styles.title}>{props.text}</Text>
        </View>
    </View>
  )
}

export default Card;