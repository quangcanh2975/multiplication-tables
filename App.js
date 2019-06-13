import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';

const numberOfQuestion = 10;
const countDownTime = 5000;
class Score extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.rightAnswer}>Right Anwsers: {this.props.rightAns}</Text>
        <Text style={styles.wrongAnswer}>Wrong Anwsers: {this.props.wrongAns}</Text>
        <Text style={styles.wrongAnswer}>Question: {this.props.current}</Text>
      </View>
    )
  }
}

class Panel extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
        <Text style={{
          color: 'white', fontWeight: 'bold', fontSize: 50, width: 350, borderRadius: 5, height: 100, backgroundColor: '#4282c2', alignSelf: 'center', textAlign: 'center'
        }} >{this.props.firstNumber} x {this.props.secondNumber}</Text>
      </View>
    )
  }
}

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      finished: false,
      currentQuestion: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
      didAnswer: false,
      choices: [],
      firstNumber: getRandomNumberInRange(1, 10),
      secondNumber: getRandomNumberInRange(1, 10),
      wherePressed: [0, 0, 0, 0],
      isRight: false,
      rightAnswer: -1,
    }
  }
  componentDidMount(previousProps) {
    this._setAnswers(this.state.firstNumber, this.state.secondNumber);
  }
  _setAnswers(_firstNumber, _secondNumber) {
    var answers = [];
    answers.push(_firstNumber * _secondNumber, _firstNumber * (_secondNumber + 1), _firstNumber * (_secondNumber + 2), _firstNumber * (_secondNumber - 1));
    answers = shuffle(answers);
    this.setState({
      currentQuestion: ++this.state.currentQuestion,
      firstNumber: _firstNumber,
      secondNumber: _secondNumber,
      didAnswer: false,
      rightAnswer: answers.indexOf(_firstNumber * _secondNumber),
      choices: [...answers],
      wherePressed: [0, 0, 0, 0],
      isRight: false,
    })
  }
  _getPressedPosition(userAnswer) {
    var temp = this.state.wherePressed;
    for (let i = 0; i < this.state.choices.length; i++) {
      if (this.state.choices[i] == userAnswer) {
        temp[i] = 1;
        this.setState({
          wherePressed: temp,
        })
        break;
      }
    }
  }
  _checkAnswer(event, userAnswer) {
    // console.log('Checking answer');
    // checking where press the button
    this._getPressedPosition(userAnswer); // get where user press in [A,B,C,D] before continue
    if (this.state.firstNumber * this.state.secondNumber === userAnswer) {
      this.setState({
        didAnswer: true,
        isRight: true,
        rightAnswers: ++this.state.rightAnswers,
      })
    }
    else {
      this.setState({
        didAnswer: true,
        isRight: false,
        wrongAnswers: ++this.state.wrongAnswers,
      })
    }
  }
  _getRandomQuestion() {
    var a = getRandomNumberInRange(1, 10), b = getRandomNumberInRange(1, 10);
    this._setAnswers(a, b);
  }
  _getStyle(index) {
    if ((this.state.isRight && this.state.wherePressed[index] == 1) || (this.state.rightAnswer == index && this.state.didAnswer)) {
      return styles.rightBtn;
    }
    if (this.state.wherePressed[index] == 1 && this.state.didAnswer) {
      return styles.wrongBtn;
    }
    return styles.answerBtn;
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Score current={this.state.currentQuestion} rightAns={this.state.rightAnswers} wrongAns={this.state.wrongAnswers} />
        <Panel firstNumber={this.state.firstNumber} secondNumber={this.state.secondNumber} />

        <View style={{ flex: 2, }}>
          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', }}>

            <Button
              containerStyle={this._getStyle(0)}
              style={styles.textBtn}
              onPress={(event) => { this._checkAnswer(event, this.state.choices[0]) }}
              disabled={this.state.didAnswer} >
              {this.state.choices[0]}
            </Button>

            <Button containerStyle={this._getStyle(1)}
              style={styles.textBtn}
              onPress={(event) => { this._checkAnswer(event, this.state.choices[1]) }} disabled={this.state.didAnswer} >{this.state.choices[1]}</Button>

            <Button containerStyle={this._getStyle(2)}
              style={styles.textBtn}
              onPress={(event) => { this._checkAnswer(event, this.state.choices[2]) }} disabled={this.state.didAnswer} >{this.state.choices[2]}</Button>

            <Button containerStyle={this._getStyle(3)}
              style={styles.textBtn}
              onPress={(event) => { this._checkAnswer(event, this.state.choices[3]) }} disabled={this.state.didAnswer} >{this.state.choices[3]}</Button>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }} >
          <Button containerStyle={styles.nextBtn} style={styles.textBtn} disabled={!this.state.didAnswer} onPress={() => this._getRandomQuestion()}>
            Next
          </Button>
        </View>
      </View >

    );
  }
}


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
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20, color: 'white'
  },
  textBtn: { fontSize: 20, color: 'white' }

})
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomNumberInRange(a, b) {
  return Math.floor((Math.random() * b) + a);
}

AppRegistry.registerComponent('multiplication-tables', () => Board);