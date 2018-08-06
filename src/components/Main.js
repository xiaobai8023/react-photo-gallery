require('normalize.css/normalize.css');
//require('styles/App.css');
require('styles/app.scss')
import React from 'react';
import ReactDOM from 'react-dom';
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

function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

function getRandomRotationDegree() {
  return (Math.random() > 0.5 ? '-' : '') + Math.ceil(Math.random() * 30);
}

function createMarkup(s) { return { __html: s.replace(/([\r\n]+)/g, '<br/>') }; }

class ImgFigure extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }



  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();

  }

  render() {
    let styleObj = {};

    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    styleObj.zIndex = this.props.arrange.isCenter ? 200 : (100 - this.props.index);

    if (this.props.arrange.rotate) {
      ['-moz-', '-ms-', '-webkit-', ''].forEach(vandor => {
        styleObj[vandor + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }, this);

    }

    let imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
    return (
      <figure className={imgFigureClassName} style={styleObj} data-index={this.props.index} onClick={this.handleClick}>
        <img src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p dangerouslySetInnerHTML={createMarkup(this.props.data.description)}></p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

class ControllerUnit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();

  }

  render() {
    var controllerUnitClassName = 'controller-unit';
    if (this.props.arrange.isCenter) {
      controllerUnitClassName += ' is-center';
      if (this.props.arrange.isInverse) {
        controllerUnitClassName += ' is-inverse';
      }
    }
    return (<span className={controllerUnitClassName} onClick={this.handleClick}></span>);
  }

}

class AppComponent extends React.Component {

  state = {
    imgsArrangeArr: []
  }

  Constant = {
    centerPos: { left: 0, right: 0 },
    hPosRange: {
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    //
    vPosRange: {
      x: [0, 0],
      topY: [0, 0]
    }
  }

  /*
   *
   *
   *
   */
  inverse(index) {
    return function () {
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }.bind(this);
  }


  center(index) {
    return function () {
      this.rearrange(index);
    }.bind(this);
  }


  componentDidMount() {
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    //
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);


    this.Constant.centerPos = { left: halfStageW - halfImgW, top: halfStageH - halfImgH };

    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = - halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);

  }

  /*

  */
  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecx = hPosRange.leftSecX,
      hPosRangeRightSecx = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,
      imgsArrangeTopArr = [],
      topImgNum = Math.ceil(Math.random() * 2),
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    //center
    imgsArrangeCenterArr[0].pos = centerPos;
    imgsArrangeCenterArr[0].isCenter = true;
    imgsArrangeCenterArr[0].rotate = 0;
    //get top
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    imgsArrangeTopArr.forEach((image, idx) => {
      imgsArrangeTopArr[idx].pos = { top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]), left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]) };
      imgsArrangeTopArr[idx].rotate = getRandomRotationDegree();
      imgsArrangeTopArr[idx].isCenter = false;
    });

    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;

      //left
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecx;
      } else {
        hPosRangeLORX = hPosRangeRightSecx;
      }
      imgsArrangeArr[i].pos = { top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]), left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]) };
      imgsArrangeArr[i].rotate = getRandomRotationDegree();
      imgsArrangeArr[i].isCenter = false;
    }

    if (imgsArrangeTopArr && imgsArrangeArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  }



  render() {
    let controllerUnits = [], imgFigures = [];

    imageData.forEach((image, idx) => {
      if (!this.state.imgsArrangeArr[idx]) {
        this.state.imgsArrangeArr[idx] = { pos: { left: 0, top: 0 }, rotate: 0, isInverse: false, isCenter: false };
      }

      imgFigures.push(<ImgFigure index={idx} data={image} key={idx} ref={'imgFigure' + idx}
        arrange={this.state.imgsArrangeArr[idx]}
        inverse={this.inverse(idx)}
        center={this.center(idx)} />);

      controllerUnits.push(<ControllerUnit arrange={this.state.imgsArrangeArr[idx]} inverse={this.inverse(idx)} center={this.center(idx)} key={idx} />);
    }, this);

    return (
      <section className="stage" ref={'stage'}>
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {

};

export default AppComponent;
