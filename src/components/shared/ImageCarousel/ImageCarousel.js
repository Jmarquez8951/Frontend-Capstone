import React from 'react';
import './ImageCarousel.scss';

import PropTypes from 'prop-types';
import {
  UncontrolledCarousel,
} from 'reactstrap';

class ImageCarousel extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }

  render() {
    const { images } = this.props;
    return (
      <div className="ImageCarousel">
         <UncontrolledCarousel items={images}/>
      </div>
    );
  }
}

export default ImageCarousel;
