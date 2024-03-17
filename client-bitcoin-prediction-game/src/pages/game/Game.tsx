import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./Game.css";

export const Game = () => {
  return (
    <Container className="container game-container">
      <Row>
        <Col sm={12} md={6}>
          <Row>
            <Col>
              <h5 className="text-success">Guess the price</h5>
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
