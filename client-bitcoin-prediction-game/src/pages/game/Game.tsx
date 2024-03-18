import React, { useEffect, useState } from "react";
import { Col, Container, Row, Alert, Button } from "react-bootstrap";

import "./Game.css";
import { btcService } from "../../services/btc.service";
import { playerService } from "../../services/player.service";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const Game = () => {
  const [btcCurrentValue, setBTCCrrentValue] = useState<undefined | number>();

  useEffect(() => {
    const fetchData = async () => {
      const [btcPrice, player] = await Promise.all([
        btcService.getCurrentBTCValue(),
        playerService.getSelf(),
      ]);
      console.log({ btcPrice, player });
      setBTCCrrentValue(btcPrice);
    };
    fetchData();
  }, []);

  const submitGuess = (guess: number) => {
    const guessDetails = {
      guess,
      btcCurrentValue,
      sendRequestAt: new Date().setSeconds(new Date().getSeconds() + 60),
    };
    localStorage.setItem("guessDetails", JSON.stringify(guessDetails));
  };

  return (
    <Container className="game-container">
      <Row>
        <Col sm={12} md={6}>
          <Row>
            <Col>
              <h5 className="text-success">Guess the price</h5>
              <Alert>
                Current price is:
                <strong>
                  {btcCurrentValue && USDollar.format(btcCurrentValue)}
                </strong>
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => submitGuess(1)}
                size="lg"
                className="full-width-button"
              >
                Up ⬆️
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => submitGuess(0)}
                size="lg"
                className="full-width-button"
              >
                Down ⬇️
              </Button>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <Row>
            <Col>
              <h5 className="text-success">Previous guesses</h5>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
