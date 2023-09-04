import { Component } from "react";
import { Typography } from "antd";

import "./filmContent.css";

const { Title, Paragraph, Text } = Typography;

export default class FilmContent extends Component {
  render() {
    const { title, overview, releaseDate } = this.props;
    return (
      <div className="film-content">
        <Title level={3}>{ title }</Title>
        <Text className="film-date">{releaseDate}</Text>
        <Paragraph>
          {overview}
        </Paragraph>
      </div>
    );
  }
}
