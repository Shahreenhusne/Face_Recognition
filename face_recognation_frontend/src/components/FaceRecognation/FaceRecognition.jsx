const FaceRecognation = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt="image"
          src={imageUrl}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{ top: box.leftCol, right: box.rightCol, bottom: bottomCol }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognation;
