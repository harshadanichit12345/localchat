import { StyleSheet } from 'react-native';

export const makeProfileStyles = (colors) => {
  const isDark = colors.text === '#FFFFFF';
  const separatorColor = isDark ? colors.card : '#ccc'; 

  return StyleSheet.create({
    containeruser: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingTop: 20,
    },
    backIconuser: {
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 15,
    },
    avatar: {
      backgroundColor: isDark ? colors.card : '#eee',
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
    },
    userName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    menuList: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    menuRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    menuIcon: {
      width: 30,
      textAlign: 'center',
      marginRight: 15,
    },
    menuItem: {
      fontSize: 16,
      color: colors.text,
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: separatorColor, 
      marginVertical: 10,
    },
  });
};
