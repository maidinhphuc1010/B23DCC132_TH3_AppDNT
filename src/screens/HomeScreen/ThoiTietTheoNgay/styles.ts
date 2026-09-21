import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },

  date: {
    fontSize: 15,
  },

  status: {
    fontSize: 12,
  },

  temperature: {
    fontSize: 15,
  },
});