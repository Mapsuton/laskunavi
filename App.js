import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Button, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screen One
const Aloitus = props => {

  const [result, setResult] = useState('');
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [data, setData] = useState([]);

  const initialFocus = useRef(null);

  const laske = operator => {
    console.log(operand1, operand2, operator);
    const [number1, number2] = [Number(operand1), Number(operand2)];
    
    if (isNaN(number1) || isNaN(number2)) {
      setResult(0);
    } else {
      let result = 0;
      switch (operator) {
        case '+':
         result = number1 + number2;
          break;
        case '-':
          result = number1 - number2;
          break;
      }
    setResult(result);

    const text = `${number1} ${operator} ${number2} = ${result}`;
    setData([...data, text]);
  }
    setOperand1('');
    setOperand2('');
    initialFocus.current.focus();
  }

    const onPress = () => {
      props.navigation.navigate('Historia', {
        data
      });
    };

  return (
    <View style={styles.container}>
      <Text>Tulos: {result} </Text>
      <TextInput style={styles.input} ref={initialFocus}
      keyboardType='number-pad'
      onChangeText={text => setOperand1(text)}
      value={operand1}>
      </TextInput>
      <TextInput style={styles.input} ref={initialFocus}
      keyboardType='number-pad'
      onChangeText={text => setOperand2(text)}
      value={operand2}>
      </TextInput>
      <View style={styles.operators}>
        <View style={styles.button}>
          <Button title='+' onPress={() => laske('+')}></Button>
        </View>
        <View style= {styles.button}>
            <Button title='-' onPress={() => laske('-')}></Button>
        </View>
        <View style= {styles.history}>
            <Button title='Historia' onPress={() => onPress('Historia')}></Button>
        </View>
      
      </View>
      
    </View>
    
  );
};

const Historia = (data) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Historia</Text>
          <FlatList
          data={data} 
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
          return <Text>{item}</Text>
          } 
          }
          /> 
    </View>
  );
};

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Aloitus" component={Aloitus} />
        <Stack.Screen name="Historia" component={Historia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    width: '50%'
  },
  operators: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    width: '20%'
  },
  history: {
    width: '50%',
  }
});

export default App;