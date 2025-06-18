import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },

    homecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f5f5f5',
        paddingTop: 30,
    },

    chat: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },

    iconButton: {
        marginLeft: 170,
    },

    menuicon: {
        padding: 5,
    },

    searchBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 10,
        paddingBottom: 20,
    },

    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },

    sendIcon: {
        marginLeft: 10,
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

    messageText: {
        fontSize: 16,
        color: 'white',
    },
    messageTime: {
        fontSize: 12,
        color: 'white',
        marginTop: 4,
    },

    dateHeader: {
        alignSelf: 'center',
        marginVertical: 8,
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        fontSize: 14,
        color: 'black',
    },
    reactionIconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#e0e0e0',
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
        marginHorizontal: 10,
    },

    selectedMessageBubble: {
        backgroundColor: '#d0ebff',
    },
    reactionBelowBubble: {
        alignSelf: 'flex-start',
        marginTop: 4,
        marginLeft: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        elevation: 2,
        top: -20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subscribeButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    subscribeButtonText: {
        color: '#fff',
        fontSize: 16
    },
});
export default styles;
