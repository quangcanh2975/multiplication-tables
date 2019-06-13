import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightAns: 0,
      wrongAns: 0
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.rightAnswer}>Right Anwsers: {this.state.rightAns}</Text>
        <Text style={styles.wrongAnswer}>Wrong Anwsers: {this.state.wrongAns}</Text>
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
      pause: false,
      didAnswer: false,
      choices: [],
      answer: 0, // answer take value [0, 1, 2] => [not answer, right, wrong]
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
      firstNumber: _firstNumber,
      secondNumber: _secondNumber,
      firstAns: answers[0],
      secondAns: answers[1],
      thirdAns: answers[2],
      lastAns: answers[3],
      answer: 0,
      didAnswer: false,
      rightAnswer: answers.indexOf(_firstNumber * _secondNumber),
      choices: [...answers],
      wherePressed: [0, 0, 0, 0],
      isRight: false,
    })
  }
  _checkAnswer(event, answer) {
    // console.log('Checking answer');
    // checking where press the button
    var temp = this.state.wherePressed;
    for (let i = 0; i < this.state.choices.length; i++) {
      if (this.state.choices[i] == answer) {
        temp[i] = 1;
        this.setState({
          wherePressed: temp,
        })
        break;
      }
    }
    if (this.state.firstNumber * this.state.secondNumber === answer) {
      this.setState({
        didAnswer: true,
        answer: 1,
        isRight: true,
      })
    }
    else {
      this.setState({
        didAnswer: true,
        answer: 2,
        isRight: false,
      })
    }
    console.log(this.state.wherePressed);
    console.log('right answer: ', this.state.rightAnswer);
  }
  _getRandomQuestion() {
    var a = getRandomNumberInRange(1, 10), b = getRandomNumberInRange(1, 10);
    this._setAnswers(a, b);
  }
  _getStyle(index) {
    var style;
    if (!this.state.didAnswer) {
      style = styles.answerBtn;
    }
    else if (this.state.wherePressed[index] == 1) {
      if (this.state.isRight) {
        style = styles.rightBtn;
      }
      else if (this.state.rightAnswer == index) {
        style = styles.rightBtn;
      }
      else {
        style = styles.wrongBtn;
      }
    }
    else if (this.state.wherePressed[index] == 0) {
      if (this.state.rightAnswer == index) {
        style = styles.rightBtn;
      }
      else {
        style = styles.answerBtn;
      }
    }
    else {
      style = styles.answerBtn;
    }
    return style;
  }
  render() {
    return (
      // Try removing the `flex: 1` on the parent View.
      // The parent will not have dimensions, so the children can't expand.
      // What if you add `height: 300` instead of `flex: 1`?
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Score />
        <Panel firstNumber={this.state.firstNumber} secondNumber={this.state.secondNumber} />

        <View style={{ flex: 2, }}>
          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', }}>

            <Button
              containerStyle={this._getStyle(0)}
              style={styles.textBtn}
              onPress={(event) => { this._checkAnswer(event, this.state.firstAns) }}
              disabled={this.state.didAnswer} >
              {this.state.firstAns}
            </Button>

            <Button containerStyle={this._getStyle(1)}
              style={styles.textBtn}
              onPress={(event) => { this._checkAnswer(event, this.state.secondAns) }} disabled={this.state.didAnswer} >{this.state.secondAns}</Button>

            <Button containerStyle={this._getStyle(2)}
              style={styles.textBtn}
              onPress={(event) => { this._checkAnswer(event, this.state.thirdAns) }} disabled={this.state.didAnswer} >{this.state.thirdAns}</Button>

            <Button containerStyle={this._getStyle(3)}
              style={styles.textBtn}
              onPress={(event) => { this._checkAnswer(event, this.state.lastAns) }} disabled={this.state.didAnswer} >{this.state.lastAns}</Button>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }} >
          <Button containerStyle={styles.nextBtn} style={styles.textBtn} onPress={() => this._getRandomQuestion()}>
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