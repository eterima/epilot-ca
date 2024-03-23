import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
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
    <Alert className="mt-3">
      <Container>
        <Row>
          <Col>
            <h6>
              Results of guess in: <strong>{totalSeconds} seconds</strong>
            </h6>
          </Col>
        </Row>
      </Container>
    </Alert>
  );
};
