import React, { useEffect, useRef, useState } from 'react';
import WebView from 'react-native-webview';

const App = () => {

  const [data, setData] = useState();
  const webviewRef = useRef();

  useEffect(() => {
    console.log(data);
  }, [data])

  useEffect(() => {
    if (data) sendDataToWebView(data);
  }, [data])

  const onMessage = (m) => {
    setData(m?.nativeEvent?.data);
  }

  function sendDataToWebView(value) {
    // value =
    // const injected = value;
    // webView.current.injectJavaScript(injected);
    // webviewRef.current.postMessage(value);
  }


  const message = "webview"
  let jsCode = 'testfunction(param){ return param }';

  return (
    <WebView
      // injectedJavaScript={jsCode}
      bounces={false}
      source={{ uri: 'http://192.168.5.130:3000' }}
      onMessage={onMessage}
    />
  );
};


export default App;
