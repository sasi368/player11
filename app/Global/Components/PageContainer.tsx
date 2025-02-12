import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import React from 'react';

const PageContainer = (props: any) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default PageContainer;
