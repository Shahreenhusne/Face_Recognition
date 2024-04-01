import { Component } from "react";
import Navigation from "./components/Navgation/Navigation.jsx";
import Logo from "./components/App_logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesBg from "particles-bg";
// import Clarifai from 'clarifai'
import "./App.css";

// const app = new Clarifai.App({
//   apikey: "c6043b9051624ffdbe2206cf3be5d888",
// });
// const apiKey = "c6043b9051624ffdbe2206cf3be5d888";

const returnClarifyRequestOptions = (imageurl) => {
  const PAT = "5c3cb9a812984d36bc799864917f272c";
  const USER_ID = "whmflqalroo2";
  const APP_ID = "Images_face_recognition";
  // const MODEL_ID = "6dc7e46bc9124c5c8824be4822abe105";
  // const IMAGE_URL = imageurl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imageurl,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input_field: "",
      imageUrl: "",
      box: "",
    };
  }

  calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topCol: clarifaiFace.top_col * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomCol: height - clarifaiFace.bottom_col * height,
    };
  }

  FaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input_field: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input_field });
    fetch(
      "https://api.clarifai.com/v2/models/" +
        "face-detection" +
        "/versions/" +
        "6dc7e46bc9124c5c8824be4822abe105" +
        "/outputs",
      returnClarifyRequestOptions(this.state.input_field)
    )
      .then((response) => response.json())
      .then((response) => this.FaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log (err))
        // console.log(
        //   response.outputs[0].data.regions[0].region_info.bounding_box
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg type="fountain" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}
export default App;
