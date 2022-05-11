import React, { useState } from 'react';
import { View, TouchableOpacity, Text,StyleSheet, Button } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Nav, Card } from '../../components';
import { Audio } from 'expo-av';

const HomeScreen = ({navigation}) => { 
  const [textItem, setTextItem] = useState('');
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);

  async function stopRecording () {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let updatedRecordings = [...recordings];
    const {sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    })
    setRecordings(updatedRecordings)
    console.log('stopRecording');
  }

  function getDurationFormatted(millis) {
    const minutes = millis /1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60 );
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`
  }

  async function startRecording () {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if(permission.status === 'granted'){
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        )
        setRecording(recording)
      } else {
        console.log('please grant permission')
      }
    } catch (error) {
      console.log(error);
    }
    console.log('startRecording');
  };

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => recordingLine.sound.replayAsync()} title="Play">
            <Card text={'Recording ' + index} key={index}> 
              <FontAwesome name='play' size={16} color="black" />
            </Card>
          </TouchableOpacity>
        </View>
      )
    });
  }
  return (
    <View >
      <Nav/>
      <View>
        <Text style={styles.title}>
          Record your audio.
        </Text>
        <Button title={recording  ? "STOP" : "START"} onPress={recording  ? stopRecording : startRecording }/>
        {getRecordingLines()}
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