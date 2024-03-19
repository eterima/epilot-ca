import React, { useEffect, useState } from "react";
import { Col, Container, Row, Alert, Button } from "react-bootstrap";

import "./Game.css";
import { btcService } from "../../services/btc.service";
import { playerService } from "../../services/player.service";
import { Timer } from "../../components/Timer/Timer";
import { GuessDetails } from "../../types/player.type";
import { guessService } from "../../services/guess.service";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const Game = () => {
  // TODO - create custom hook
  const [btcCurrentValue, setBTCCrrentValue] = useState<undefined | number>();
  const [sendRequestAt, setSendRequestAt] = useState<Date>();
  const [allTimeScore, setAllTimeScore] = useState<number>();
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [displayTimer, setDisplayTimer] = useState(false);
  const [guessDetails, setGuessDetails] = useState<GuessDetails>();

  useEffect(() => {
    const fetchData = async () => {
      const [btcPrice, player] = await Promise.all([
        btcService.getCurrentBTCValue(),
        playerService.getSelf(),
      ]);
      setBTCCrrentValue(btcPrice);
      setAllTimeScore(player.allTimeScore);
    };
    fetchData();
  }, []);

  const scheduleSubmitGuess = (guess: number) => {
    const requestDate = new Date(
      new Date().setSeconds(new Date().getSeconds() + 5),
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
    console.log("Submitting guess", guessDetails);
    if (!guessDetails?.btcCurrentValue) {
      // TODO - Handle this
      return;
    }
    const response = await guessService.createGuess({
      btcValue: guessDetails.btcCurrentValue,
      guess: guessDetails.guess,
    });
    console.log(response);
  };

  const onTimerFinish = async () => {
    setDisplayTimer(false);
    await submitGuess();
  };

  return (
    <Container className="game-container">
      <Row>
        <Col sm={12} md={6}>
          <Row>
            <Col>
              <h5 className="text-success">Guess the price</h5>
              <Alert>
                Current price is:{" "}
                <strong>
                  {btcCurrentValue && USDollar.format(btcCurrentValue)}
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
        <Col sm={12} md={6}>
          <Row>
            <Col>
              <h5 className="text-success">Stats</h5>
              <Alert>
                All time score: <strong>{allTimeScore}</strong>
              </Alert>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
