import { Component } from "react";
import { Col, Row } from "antd";

import FilmContent from "../filmContent";
import FilmPicture from "../filmPicture";
import "./filmcard.css";

export default class FilmCard extends Component {
  render() {
    const { id, title, overview, releaseDate, picture } = this.props;
    return (
      <div className="film-card">
        <Row>
          <Col span={10}>
            <FilmPicture id={id} picture={picture}/>
          </Col>
          <Col span={14}>
            <FilmContent title = {title} overview={overview} releaseDate={releaseDate} />
          </Col>
        </Row>
      </div>
    );
  }
}
