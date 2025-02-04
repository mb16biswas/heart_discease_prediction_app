import React, {Component} from 'react'
import './App.css';
import axios from "axios"
import Input from '@material-ui/core/Input'
import Popup from "./components/Popup/Popup"
import Loading from "./components/Loading/Loading"
import Output1 from "./components/Output1/Output1"
import Output2 from "./components/Output2/Output2"



class App extends Component{

   constructor(){
     super()
     this.state = {
       age : "",
       sex : "",
       cp : "",
       trestbps : "",
       chol : "",
       fbs : "",
       restecg : "",
       thalach : "",
       exang : "",
       oldpeak : "",
       slope : "",
       ca : "",
       thal : "" ,
       test : "" ,
       selectedFile: null ,
       status : "Input" ,
       pred : [] ,




     }
   }



  onSubmit = () => {



    const data1 = [
      this.state.age,
      this.state.sex,
      this.state.cp ,
      this.state.trestbps,
      this.state.chol ,
      this.state.fbs ,
      this.state.restecg ,
      this.state.thalach ,
      this.state.exang ,
      this.state.oldpeak ,
      this.state.slope ,
      this.state.ca ,
      this.state.thal]



    axios.post(`${process.env.REACT_APP_BACKEND_URL}accept` , data1)
    .then((res) => {

      this.setState({pred : res.data.data})
      this.setState({status : "output1"})
      this.setState({age : ""})
      this.setState({sex : ""})
      this.setState({cp : ""})
      this.setState({trestbps : ""})
      this.setState({chol : ""})
      this.setState({fbs : ""})
      this.setState({restecg : ""})
      this.setState({thalach : ""})
      this.setState({exang : ""})
      this.setState({oldpeak : ""})
      this.setState({slope : ""})
      this.setState({ca : ""})
      this.setState({thal : ""})
     })
    .catch((err) =>{
      console.log(err)
    })

    this.setState({status : "loading" })

  }


  validate = (event) =>{
    if(event.key >= 0 && event.key <= 10  && event.key !== " "){

    }
    else if(event.key === "."){
    }
    else{
      event.preventDefault()
    }
    }


  onFileChange = (e) => {

    // Update the state
    this.setState({ selectedFile: e.target.files[0] });

  };
  onFileUpload = () => {

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile

    );


    // Details of the uploaded file


    // Request made to the backend api
    // Send formData object

  // //  https://www.geeksforgeeks.org/file-uploading-in-react-js/
  axios.post(`${process.env.REACT_APP_BACKEND_URL}csv`, formData)
  .then((res) =>{

    this.setState({pred : res.data.data})
    this.setState({selectedFile : null})
    this.setState({status : "output2"})


  })
  .catch((err) => {
    console.log(err)
  })

  this.setState({status : "loading"})


  };

  home = () => {
    this.setState({status : "Input"})
  }

  render(){


    if(this.state.status === "Input"){
      return (
        <div className="App">
            <div className = "tittle">
              <h1 >HEART DISEASE PREDICTOR </h1>
            </div>
            <p>You can upload a csv file here to get the prediction</p>
            <input  type="file" id="fileSelect" accept=".csv" onChange={this.onFileChange}/>
            <button onClick={this.onFileUpload}>
                    Upload!
                  </button>
            <p>Or you can can enter your informations in the input fields to get the prediction </p>
            <p>If empty fields are submitted then we replace the empty fields with the mean value, try to fill as many fields as you can </p>

            <Popup/>
            <h2>age</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({age : e.target.value })}} />
            <h2>sex</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({sex : e.target.value })}}  />
            <h2>cp</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({ cp: e.target.value})}}/>
            <h2>trestbps</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({trestbps : e.target.value})} }/>
            <h2>chol</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type"onChange = {(e) => {this.setState({chol : e.target.value})}} />
            <h2>fbs</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({fbs : e.target.value})}} />
            <h2>restecg</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type"onChange = {(e) => {this.setState({ restecg: e.target.value})}}/>
            <h2>thalach</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type"onChange = {(e) => {this.setState({ thalach: e.target.value})}} />
            <h2>exang</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({exang : e.target.value})}} />
            <h2>oldpeak</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({oldpeak : e.target.value})}} />
            <h2>slope</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type"  onChange = {(e) => {this.setState({slope : e.target.value})}} />
            <h2>ca</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type"  onChange = {(e) => {this.setState({ca : e.target.value})}} />
            <h2>thal</h2>
            <Input       onKeyPress= {this.validate} placeholder = "type"   onChange = {(e) => {this.setState({ thal: e.target.value})}} />
            <button   onClick = {this.onSubmit}>submit</button>
        </div>
      );

    }
    else if(this.state.status === "loading"){
      return(
        <Loading/>
      )
    }

    else if(this.state.status === "output1"){
      return(
        <Output1 pred = {this.state.pred} home = {this.home} />
      )
    }
    else{
      return(
        <Output2 pred = {this.state.pred} home = {this.home} />
      )

    }
}

}

export default App;
