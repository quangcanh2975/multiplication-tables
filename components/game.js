import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import styles from './styles.js';
import { NavigationEvents } from 'react-navigation';

const numberOfQuestion = 10;

var setTimeOutFunction; //use for clear time out
class Score extends Component {
  render() {
    return (
      <View style={styles.flexOfView}>
        <Text style={styles.rightAnswer}>
          Right Answers: {this.props.rightAns}
        </Text>
        <Text style={styles.wrongAnswer}>
          Wrong Answers: {this.props.wrongAns}
        </Text>
        <Text style={styles.wrongAnswer}>Question: {this.props.current}</Text>
      </View>
    );
  }
}

class Panel extends Component {
  render() {
    return (
      <View style={styles.flexOfView}>
        <Text style={[{ backgroundColor: '#4282c2' }, styles.panel]}>
          {this.props.firstNumber} x {this.props.secondNumber}
        </Text>
      </View>
    );
  }
}

export default class Board extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    var initialTables = this.props.navigation.getParam('selectedTables', [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ]);
    this.state = {
      start: false,
      currentQuestion: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
      didAnswer: false,
      choices: [],
      isTimer: this.props.navigation.getParam('timer', true),
      countDownTime: this.props.navigation.getParam('waitingTime', 3) * 1000,
      selectedTables: initialTables,
      firstNumber: getRamdomNumberOfSelectedTables(initialTables),
      // secondNumber: getRandomNumberInRange(initialTables),
      // firstNumber: getRandomNumberInRange(1, 10),
      secondNumber: getRandomNumberInRange(1, 10),
      wherePressed: [0, 0, 0, 0],
      isRight: false,
      rightAnswer: -1,
      questionRange: [],
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  _getRandomQuestion() {
    var a, b;
    if (this.state.currentQuestion === numberOfQuestion) {
      this.setState({
        start: false,
      });
      this.props.navigation.navigate('Result', {
        rightAnswers: this.state.rightAnswers,
        wrongAnswers: this.state.wrongAnswers,
      });

      return;
    }
    // Below is finishGame
    if (this.state.start) {
      //old way to get number
      // var a = getRandomNumberInRange(1, 10),
      //   b = getRandomNumberInRange(1, 10);
      do {
        a = getRamdomNumberOfSelectedTables(this.state.selectedTables);
        b = getRandomNumberInRange(1, 10);
      } while (checkQuestionRange([a, b], this.state.questionRange));
      this._setAnswers(1, a, b);
      return;
    }
  }

  // option mean: 0 set all to the beginning, 1 just set in the game
  _setAnswers(option, _firstNumber, _secondNumber) {
    var answers = [];
    answers.push(
      _firstNumber * _secondNumber,
      _firstNumber * (_secondNumber + 1),
      _firstNumber * (_secondNumber + 2),
      _firstNumber * (_secondNumber - 1)
    );
    answers = shuffle(answers);

    if (option === 1) {
      this.setState({
        currentQuestion: ++this.state.currentQuestion,
        firstNumber: _firstNumber,
        secondNumber: _secondNumber,
        didAnswer: false,
        rightAnswer: answers.indexOf(_firstNumber * _secondNumber),
        choices: [...answers],
        wherePressed: [0, 0, 0, 0],
        isRight: false,
        questionRange: [
          ...this.state.questionRange,
          [_firstNumber, _secondNumber],
        ],
      });
    } else {
      this.setState({
        start: true,
        currentQuestion: 1,
        rightAnswers: 0,
        wrongAnswers: 0,
        firstNumber: _firstNumber,
        secondNumber: _secondNumber,
        didAnswer: false,
        rightAnswer: answers.indexOf(_firstNumber * _secondNumber),
        choices: [...answers],
        wherePressed: [0, 0, 0, 0],
        isRight: false,
        questionRange: [[_firstNumber, _secondNumber]],
      });
    }
    // check answer automatically for timer this is really OK
    if (this.state.isTimer) {
      setTimeOutFunction = setTimeout(() => {
        if (this._isMounted) {
          this._checkAnswer();
        }
      }, this.state.countDownTime);
    }
  }

  _getPressedPosition(userAnswer) {
    var temp = this.state.wherePressed;
    for (let i = 0; i < this.state.choices.length; i++) {
      if (this.state.choices[i] == userAnswer) {
        temp[i] = 1;
        this.setState({
          wherePressed: temp,
        });
        break;
      }
    }
  }
  _checkAnswer(event, userAnswer) {
    // checking where press the button
    clearTimeout(setTimeOutFunction);
    this._getPressedPosition(userAnswer); // get where user press in [A,B,C,D] before continue
    if (this.state.firstNumber * this.state.secondNumber === userAnswer) {
      this.setState({
        didAnswer: true,
        isRight: true,
        rightAnswers: ++this.state.rightAnswers,
      });
    } else {
      this.setState({
        didAnswer: true,
        isRight: false,
        wrongAnswers: ++this.state.wrongAnswers,
      });
    }
    setTimeout(() => {
      this._getRandomQuestion();
    }, 500);

    // checking number of question and pass params to app.js
  }

  _getStyle(index) {
    if (
      (this.state.isRight && this.state.wherePressed[index] == 1) ||
      (this.state.rightAnswer == index && this.state.didAnswer)
    ) {
      return styles.rightBtn;
    }
    if (this.state.wherePressed[index] == 1 && this.state.didAnswer) {
      return styles.wrongBtn;
    }
    return styles.answerBtn;
  }

  render() {
    return (
      <View style={styles.flexOfView}>
        <NavigationEvents
          onWillFocus={() => {
            this._isMounted = true;
            this._setAnswers(
              0,
              getRamdomNumberOfSelectedTables(this.state.selectedTables),
              // getRamdomNumberOfSelectedTables(this.state.selectedTables)
              // getRandomNumberInRange(1, 10),
              getRandomNumberInRange(1, 10)
            );
          }}
        />
        <Score
          current={this.state.currentQuestion}
          rightAns={this.state.rightAnswers}
          wrongAns={this.state.wrongAnswers}
        />
        <Panel
          firstNumber={this.state.firstNumber}
          secondNumber={this.state.secondNumber}
        />

        <View style={{ flex: 3 }}>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Button
              containerStyle={this._getStyle(0)}
              style={styles.textBtn}
              onPress={event => {
                this._checkAnswer(event, this.state.choices[0]);
              }}
              disabled={this.state.didAnswer}>
              {this.state.choices[0]}
            </Button>

            <Button
              containerStyle={this._getStyle(1)}
              style={styles.textBtn}
              onPress={event => {
                this._checkAnswer(event, this.state.choices[1]);
              }}
              disabled={this.state.didAnswer}>
              {this.state.choices[1]}
            </Button>

            <Button
              containerStyle={this._getStyle(2)}
              style={styles.textBtn}
              onPress={event => {
                this._checkAnswer(event, this.state.choices[2]);
              }}
              disabled={this.state.didAnswer}>
              {this.state.choices[2]}
            </Button>

            <Button
              containerStyle={this._getStyle(3)}
              style={styles.textBtn}
              onPress={event => {
                this._checkAnswer(event, this.state.choices[3]);
              }}
              disabled={this.state.didAnswer}>
              {this.state.choices[3]}
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function getTablesRange(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === true) {
      result.push(i + 1);
    }
  }
  return result;
}

function getRamdomNumberOfSelectedTables(arr) {
  var tablesRange = getTablesRange(arr);
  var index = getRandomNumberInRange(0, tablesRange.length - 1); // get a random index of array
  return tablesRange[index];
}

function isExisted(newQuestion, oldQuestion) {
  if (newQuestion[0] === oldQuestion[0] && newQuestion[1] === oldQuestion[1]) {
    return true;
  }
  return false;
}

function checkQuestionRange(newQuestion, existedQuestion) {
  for (let i = 0; i < existedQuestion.length; i++) {
    if (isExisted(newQuestion, existedQuestion[i])) {
      return true;
    }
  }
  return false;
}
