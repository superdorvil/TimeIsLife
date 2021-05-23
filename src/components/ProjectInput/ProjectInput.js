import React from 'react';
import {TextInput, Text, View} from 'react-native';
import {Colors} from '_resources';

const ProjectInput = ({header, value, onChangeText, placeholder}) => {
  return (
    <View style={containerStyle()}>
      <Text style={headerStyle()}>{header}</Text>
      <View style={textInputContainerStyle()}>
        <TextInput
          keyboardType="default"
          style={textInputStyle()}
          multiline
          value={value}
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.primary[global.colorScheme]}
        />
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {marginTop: 16};
};

const headerStyle = () => {
  return {
    fontSize: 16,
    marginStart: 16,
    color: Colors.tertiary[global.colorScheme],
  };
};

const textInputStyle = () => {
  return {
    fontSize: 20,
    marginStart: 16,
    marginEnd: 16,
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomColor: Colors.tertiary[global.colorScheme],
    borderBottomWidth: 1,
    color: Colors.tertiary[global.colorScheme],
  };
};

const textInputContainerStyle = () => {
  return {
    borderWidth: 1,
    borderColor: Colors.primary[global.colorScheme],
    borderRadius: 12,
    backgroundColor: Colors.secondary[global.colorScheme],
    marginTop: 16,
  };
};

export default ProjectInput;
