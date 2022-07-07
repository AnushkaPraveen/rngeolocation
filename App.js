import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

const App = () => {


  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const[locationData,setLocationData]=useState([])
useEffect(()=>{
  requestLocationPermission()
 
},[])


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        /* {
          title: 'Example App',
          message: 'Example App access to your location ',
        }, */
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        alert('You can use the location');
        setHasLocationPermission(true);
        
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };  

const getLocation=()=>{

  if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
        (position) => {
          setLocationData(position);
          console.log(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
}

  return (
    <View style={styles.mainContainer}>
      <Text>react native geoloacation service</Text>
       <Button title='Get Location' onPress={getLocation}/>  
      {/* <Text>latitude : {locationData.coords.latitude }</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    justifyContent:'center',
    alignSelf:'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
