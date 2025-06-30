import { StyleSheet } from 'react-native';

export const makeHomeStyles = (colors) => {
  const isDark = colors.text === '#FFFFFF';
  const line = isDark ? '#555' : '#ccc';

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.bg
    },

    homecontainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      paddingTop: 20,
      backgroundColor: colors.headerBg,
      borderBottomWidth: 1,
      borderBottomColor: line,
    },

    chat: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text
    },

    iconButton: {
      marginLeft: 170
    },

    menuicon: {
      padding: 5
    },

    notificationBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: 'red',
      borderRadius: 10,
      minWidth: 18,
      paddingHorizontal: 5,
      paddingVertical: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notificationCount: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold'
    },

    messageList: {
      flexGrow: 1,
      paddingHorizontal: 10,
      paddingBottom: 10,
      justifyContent: 'flex-end',
    },

    sentMessageBubble: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 12,
      marginVertical: 7,
      alignSelf: 'flex-end',
      maxWidth: '75%',
      elevation: 2,
    },
    receivedMessageBubble: {
      backgroundColor: isDark ? '#444' : '#e5e5ea',
      padding: 10,
      borderRadius: 10,
      maxWidth: '75%',
      alignSelf: 'flex-start',
    },
    selectedMessageBubble: {
      backgroundColor: '#d0ebff'
    },

    messageText: {
      fontSize: 16
    },

    messageTime: {
      fontSize: 12,
      marginTop: 4
    },

    dateHeader: {
      alignSelf: 'center',
      marginVertical: 8,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 10,
      fontSize: 14,
      backgroundColor: colors.dateBg,
      color: colors.text,
    },

    reactionIconContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: isDark ? colors.card : '#e0e0e0',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      alignSelf: 'flex-end',
      marginBottom: 5,
      marginRight: 12,
      elevation: 3,
      zIndex: 100,
    },
    emoji: {
      fontSize: 15,
      marginHorizontal: 10
    },

    reactionBelowBubble: {
      alignSelf: 'flex-start',
      marginTop: 4,
      marginLeft: 5,
      backgroundColor: isDark ? '#444' : '#e5e5ea',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: line,
      elevation: 2,
      top: -20,
      paddingHorizontal: 6,
    },

    searchBoxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: line,
      padding: 10,
      paddingBottom: 20,
    },

    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: line,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 8,
      fontSize: 16,
      backgroundColor: colors.inputBg,
      color: colors.text,
    },
    sendIcon: {
      marginLeft: 10
    },
  });
};
