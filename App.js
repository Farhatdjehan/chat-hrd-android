import CookieManager from '@react-native-cookies/cookies';
import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import { Button, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

CookieManager.get('https://chat-hrd.vercel.app')
  .then((cookies) => {
    console.log('CookieManager.get =>', cookies, "<==")
  }
  );


const App = () => {

  const [data, setData] = useState();
  const [dataSendBack, setDataSendBack] = useState();
  const webviewRef = useRef();

  useEffect(() => {
    if (data !== undefined && dataSendBack) {
      CookieManager.set('https://chat-hrd.vercel.app', {
        name: 'data',
        value: `${dataSendBack}`,
        version: '1',
        expires: '2029-05-30T12:30:00.00-05:00'
      }).then((done) => {
        console.log('CookieManager.set =>', done);
      });
    }
  }, [data, dataSendBack])

  useEffect(() => {
    if (data) {
      storeData(data)
      // sendDataToWebView(data);
    }
  }, [data])

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    sendDataToWebView(data);
  }, [webviewRef])

  const sendDataToWebView = (dataObject) => {
    webviewRef.current.injectJavaScript(`( function() { 
      document.dispatchEvent( new MessageEvent('message', { 
      data: ${JSON.stringify(dataObject)}, 
      origin : 'react-native' 
     })); })();` );

  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('data')
      if (value !== null) {
        setDataSendBack(value);
        // value previously stored
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('data', value)
    } catch (e) {
      console.log(e);
    }
  }

  const onMessage = (e) => {
    setData(e?.nativeEvent?.data);
  }

  return (
    <>

      <WebView
        ref={webviewRef}
        bounces={false}
        source={{ uri: 'https://chat-hrd.vercel.app' }}
        onMessage={onMessage}
      />
    </>
  );
};


export default App;
