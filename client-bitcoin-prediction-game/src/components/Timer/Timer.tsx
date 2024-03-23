import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTimer } from "react-timer-hook";

type Props = {
  sendRequestAt: Date;
  onTimerFinish: () => void;
};

export const Timer = ({ sendRequestAt, onTimerFinish }: Props) => {
  const { totalSeconds } = useTimer({
    expiryTimestamp: new Date(sendRequestAt),
    autoStart: true,
    onExpire: onTimerFinish,
  });

  return (
    <Container>
      <Row>
        <Col>
          <h3>
            Results in: <strong>{totalSeconds} seconds</strong>
          </h3>
        </Col>
      </Row>
    </Container>
  );
};
