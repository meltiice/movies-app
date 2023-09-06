import { Component } from "react";
import { Typography } from "antd";

import "./filmContent.css";

const { Title, Paragraph, Text } = Typography;

export default class FilmContent extends Component {
  isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => (scrollHeight > clientHeight || scrollWidth > clientWidth)

  eventOver = (e) => {
    if (this.isOverflown(e.target)) {
      console.log('overflow')
    }
  }

  render() {
    const { title, overview, releaseDate } = this.props;
    return (
      <div className="film-content">
        <Title level={3} className="title" onClick={(e) => { console.log(e.target.scrollHeight) }}>{ title }</Title>
        <Text className="film-date">{releaseDate}</Text>
        <Paragraph>
          {overview}
        </Paragraph>
      </div>
    );
  }
}
