import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

    return(
        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}} >
            <Text>home screen</Text>
        </SafeAreaView>

    );
}

export default HomeScreen
