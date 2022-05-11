import { Text, View, TouchableOpacity,TextInput, StyleSheet } from 'react-native';
import { HOME } from '../../constants/routes'
import { Card } from "../../components"

const CartScreen = ({navigation}) => { 

  
  return (
    <View style={styles.container}>
      <TouchableOpacity>
          <Card text="You can contact us by email."/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CartScreen;