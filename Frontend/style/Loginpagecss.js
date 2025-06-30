import { StyleSheet } from 'react-native';

export const makeLoginStyles = (colors) => {
  const isDark = colors.text === '#FFFFFF';
  const grayishBorder = '#555';

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? colors.bg : '#f2f2f2',
      padding: 20,
    },

    inputFocused: {
      borderColor: '#007bff',
      backgroundColor: isDark ? colors.card : '#fff',
      shadowColor: '#007bff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },

    formBox: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: isDark ? colors.card : '#ffffff',
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? grayishBorder : '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },

    heading: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center',
      color: colors.text,
    },

    input: {
      borderWidth: 1,
      borderColor: isDark ? grayishBorder : '#ccc',
      padding: 12,
      marginBottom: 12,
      borderRadius: 8,
      backgroundColor: isDark ? colors.card : '#fff',
      color: colors.text,
    },

    emailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

    smallButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    smallButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },

    button: {
      backgroundColor: '#007bff',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 4,
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 18,
    },

    orText: {
      textAlign: 'center',
      marginVertical: 16,
      color: isDark ? colors.text : '#999',
    },

    googleButton: {
      backgroundColor: isDark ? colors.bg : '#FFFFFF',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: isDark ? grayishBorder : '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    googleButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    googleLogo: {
      width: 30,
      height: 30,
      marginRight: 10,
      resizeMode: 'contain',
    },
    googleButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '500',
    },
  });
};
