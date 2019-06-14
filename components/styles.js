import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    answerBtn: {
      padding: 10, height: 100, width: 100, overflow: 'hidden', borderRadius: 4, backgroundColor: '#ffae00', margin: 30, justifyContent: 'center', alignSelf: 'center',
    },
    nextBtn: {
      padding: 10, height: 50, width: 200, overflow: 'hidden', borderRadius: 4, backgroundColor: '#4282c2', justifyContent: 'center', alignSelf: 'center',
    },
    wrongBtn: {
      padding: 10, height: 100, width: 100, overflow: 'hidden', borderRadius: 4, backgroundColor: '#df1c3c', margin: 30, justifyContent: 'center', alignSelf: 'center',
    },
    rightBtn: {
      padding: 10, height: 100, width: 100, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1dd065', margin: 30, justifyContent: 'center', alignSelf: 'center',
    },
    wrongAnswer: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: 20,
      // color: '#df1c3c'
    },
    rightAnswer: {
      color: 'green',
      fontWeight: 'bold',
      fontSize: 20,
      // color: '#1dd065'
    },
    containerBtn: {
        marginTop: 10, color: 'white', fontWeight: 'bold', fontSize: 30, width: 200, borderRadius: 5, height: 50, alignSelf: 'center', textAlign: 'center', justifyContent: 'center', backgroundColor: '#ffae00'
    },
    textBtn: { fontSize: 20, color: 'white' },
    flexOfView: { flex: 1, justifyContent: "center", alignItems: "center" },
    panel: {
        color: 'white', fontWeight: 'bold', fontSize: 50, width: 350, borderRadius: 5, height: 100, alignSelf: 'center', textAlign: 'center', justifyContent: 'center',
      }
  })
  export default styles;