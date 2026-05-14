import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#000000',
  },

  title: {
    fontSize: 28,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white',
  },

  input: {
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffffff45',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#ffffff17',
  },

  button: {
    backgroundColor: '#ffffffe2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  link: {
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 6,
    fontSize: 13,
  },

  highlight: {
  fontWeight: '900',
}
});

export default styles;