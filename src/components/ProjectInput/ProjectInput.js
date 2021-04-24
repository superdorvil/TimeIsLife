import React from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';
import {Colors} from '_resources';

const ProjectInput = ({header, value, onChangeText, placeholder}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          keyboardType="default"
          style={styles.textInput}
          multiline
          value={value}
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    fontSize: 16,
    marginStart: 16,
    color: Colors.tertiary,
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: Colors.tertiary,
    borderRadius: 12,
    backgroundColor: Colors.textbox,
    marginTop: 16,
  },
  textInput: {
    fontSize: 20,
    marginStart: 16,
    marginEnd: 16,
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomColor: Colors.tertiary,
    borderBottomWidth: 2,
    color: Colors.primary,
  },
});

export default ProjectInput;
