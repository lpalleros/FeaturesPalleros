import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Nav, Card } from '../../components';
import { ADD_BAND } from "../../store/actions/bands.action";
import { uuidv4 } from '../../utils/utils';
import { Audio } from 'expo-av';

const HomeScreen = ({navigation}) => { 
  const [textItem, setTextItem] = useState('');
  const Bands = useSelector(state => state);
  const dispatch = useDispatch()

  const handleAdd = () => {
    const newID = uuidv4();
    const newItem = {id: newID, name: textItem}
    dispatch({type: ADD_BAND, payload: newItem})
    setTextItem('');
  }
  
  const onHandleChangeItem = (text) => {
    return setTextItem(text)
  }
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/priority.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View >
      <Nav/>
      <View>
        <Text style={styles.title}>
          Your Bands
        </Text>
        <View style={styles.container}>
          <Button title="Play Sound" onPress={playSound} />
        </View>
        <View style={styles.form}>
          <TextInput 
            placeholder='Add a new band'
            value={textItem}
            onChangeText={onHandleChangeItem}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleAdd}>
            <Text style={styles.title}><FontAwesome name='plus' color="#000" size={22} /></Text>
          </TouchableOpacity>
        </View>
      </View>
      <View >
        <FlatList 
          data={Bands.bands}
          renderItem={ data => (
            <TouchableOpacity>
              <Card text={data.item.name} key={data.item.id}/>
            </TouchableOpacity>
          )}
          keyExtractor= {(item) => item.id}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    padding: 10,
    marginVertical: 20,
    color: '#0c0c0c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  input: {
    fontSize: 20,
    flex: 1,
  }
});

export default HomeScreen;