import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containeruser: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#eee',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B6E6E',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
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
    color: '#333',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
})
