/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends PureComponent {

  state = {
    //Assing a array to your pokeList state
    density: 0,
    //Have a loading state where when data retrieve returns data. 
    time: ''
  } 

  componentDidMount() {
    this.interval = setInterval(async () => {
      try {
        const apiCALL = await fetch('http://192.168.31.138:8080/getDensity');
        const data = await apiCALL.json();
        console.log(data)
        this.setState({density: data.density, time: data.time});
      } catch(err) {
          console.log("Error fetching data-----------", err);
      }
    }, 1000);
  }

  render() { 
    const {time, density} = this.state
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Mật độ bụi trong không khí:</Text>
                <Text style={styles.sectionCenter}>{density}mg/m³</Text>
                <Text style={styles.sectionDescription}>
                  Được đo vào lúc: {time}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  };
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
