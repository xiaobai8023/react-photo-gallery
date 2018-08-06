require('normalize.css/normalize.css');
//require('styles/App.css');
require('styles/main.scss')
import React from 'react';

//let yeomanImage = require('../images/yeoman.png');
let imageData = require('../data/image-data.json');

imageData = (function genImageURL(arrImages) {
  for (var i = 0, j = arrImages.length; i < j; i++) {
    var singleImageObject = arrImages[i];
    singleImageObject.imageURL = require('../images/' + singleImageObject.fileName);
    arrImages[i] = singleImageObject;
  }
  return arrImages;
})(imageData);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">

        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
  imageData: imageData
};

export default AppComponent;
