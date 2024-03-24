import React, { useEffect, useState } from "react";
import { Col, Container, Row, Alert, Button } from "react-bootstrap";

import "./Game.css";
import { btcService } from "../../services/btc.service";
import { playerService } from "../../services/player.service";
import { Timer } from "../../components/Timer/Timer";
import { GuessDetails } from "../../types/player.type";
import { guessService } from "../../services/guess.service";
import { Guess } from "../../types/guess.type";
import { GuessResult } from "../../components/GuessResult/GuessResult";
import { numberToUsd } from "../../utils/numberToUsd";

export const Game = () => {
  // TODO - create custom hook
  const [btcCurrentValue, setBTCCrrentValue] = useState<undefined | number>();
  const [sendRequestAt, setSendRequestAt] = useState<Date>(
    new Date(new Date().setSeconds(new Date().getSeconds() + 15000)),
  );
  const [allTimeScore, setAllTimeScore] = useState<number>();
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [displayTimer, setDisplayTimer] = useState(false);
  const [guessDetails, setGuessDetails] = useState<GuessDetails>();
  const [guessResult, setGuessResult] = useState<Guess>();

  useEffect(() => {
    playerService.getSelf().then((player) => {
      setAllTimeScore(player.allTimeScore);
      setIsGameInProgressOnInit();
    });
  }, []);

  const setIsGameInProgressOnInit = async () => {
    const guessDetailsString = localStorage.getItem("guessDetails");
    if (!guessDetailsString) {
      return;
    }
    const guessDetails = JSON.parse(guessDetailsString) as GuessDetails;

    const now = new Date();
    const sendRequestAt = new Date(guessDetails.sendRequestAt);

    if (sendRequestAt < now) {
      await fetchData();
      return;
    }

    setGuessDetails(guessDetails);
    setBTCCrrentValue(guessDetails.btcCurrentValue);
    setIsGameInProgress(true);
    setDisplayTimer(true);
    setSendRequestAt(guessDetails.sendRequestAt);
  };

  const fetchData = async () => {
    const btcPrice = await btcService.getCurrentBTCValue();
    setBTCCrrentValue(btcPrice);
  };

  const scheduleSubmitGuess = (guess: number) => {
    const requestDate = new Date(
      new Date().setSeconds(new Date().getSeconds() + 60),
    );
    const guessDetails: GuessDetails = {
      guess,
      btcCurrentValue: Number(btcCurrentValue),
      sendRequestAt: requestDate,
    };
    localStorage.setItem("guessDetails", JSON.stringify(guessDetails));
    setGuessDetails(guessDetails);
    setIsGameInProgress(true);
    setDisplayTimer(true);
    setSendRequestAt(requestDate);
  };

  const submitGuess = async () => {
    if (!guessDetails?.btcCurrentValue) {
      // TODO - Handle this
      return;
    }
    const response = await guessService.createGuess({
      btcValue: guessDetails.btcCurrentValue,
      guess: guessDetails.guess,
    });

    setAllTimeScore(
      response.isWin ? Number(allTimeScore) + 1 : Number(allTimeScore) - 1,
    );
    setGuessResult(response);
  };

  const onTimerFinish = async () => {
    setDisplayTimer(false);
    await submitGuess();
  };

  const onStartNextRound = async () => {
    setBTCCrrentValue(guessResult?.btcValueAfter);
    setGuessResult(undefined);
    setIsGameInProgress(false);
  };

  return (
    <Container className="game-container">
      <Row>
        <Col>
          <Row>
            <Col className="mt-3">
              <h5 className="text-primary">Guess BTC price</h5>
              <hr />
              <p>
                Bitcoing game where you guess the next price. You can guess only
                once in 60 seconds. <br />
                If you win, you get 1 point. If you lose, you lose 1 point. You
                can to lower than 0.
              </p>
              <hr />
              <Alert>
                All time score is: <strong>{allTimeScore}</strong>
              </Alert>
              <Alert>
                Current BTC price is:{" "}
                <strong>
                  {btcCurrentValue && numberToUsd(btcCurrentValue)}
                </strong>
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => scheduleSubmitGuess(1)}
                disabled={isGameInProgress}
                size="lg"
                className="full-width-button"
              >
                Up ⬆️
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => scheduleSubmitGuess(0)}
                disabled={isGameInProgress}
                size="lg"
                className="full-width-button"
              >
                Down ⬇️
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {sendRequestAt && displayTimer && (
                <Timer
                  sendRequestAt={sendRequestAt}
                  onTimerFinish={onTimerFinish}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          {guessResult && (
            <GuessResult
              onStartNextRound={onStartNextRound}
              guessResult={guessResult}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
