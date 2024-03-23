import React from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { Guess } from "../../types/guess.type";

type Props = {
  guessResult: Guess;
  onStartNextRound: () => void;
};

export const GuessResult = ({ guessResult, onStartNextRound }: Props) => {
  return (
    <Alert className="mt-3" variant={guessResult.isWin ? "success" : "danger"}>
      <Row>
        <Col>
          <p>
            You guessed price will go:{" "}
            <span>
              {guessResult.guess === 0 ? "Down" : "Up"}
              <strong></strong>
            </span>
          </p>
          <p>
            Correct guess:{" "}
            <span
              className={guessResult.isWin ? "text-success" : "text-danger"}
            >
              {guessResult.isWin ? "Yes" : "No"}
              <strong></strong>
            </span>
          </p>
          <p>
            Guess based on BTC value:{" "}
            <span>
              {guessResult.btcValue}
              <strong></strong>
            </span>
          </p>
          <p>
            BTC value after:{" "}
            <span>
              {guessResult.btcValueAfter}
              <strong></strong>
            </span>
          </p>
        </Col>
        <Button onClick={onStartNextRound}>Start next round</Button>
      </Row>
    </Alert>
  );
};
