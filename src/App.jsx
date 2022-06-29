import React, { useState } from 'react';
import './App.css'
import './styles/custom.css'
import Header from './components/modules/header';
import Footer from './components/modules/footer';
import Main from './components/sections/mainPage';
import SelectField from './components/elements/select';

const selectPrefix = [
  { label: "Triage", value: "TRI" },
  { label: "National Debt Line", value: "NDL" },
  { label: "Business Debt Line", value: "BDL" },
]


function App() {
  
  const [prefix, setPrefix] = useState("TRI");
  const [data, setData] = useState([]);
  const showValue = (value) => {
    console.log('value :>> ', value.value);   
    setPrefix(value.value)
  }

  const loadData = async () => {
    const api = "https://webapps.moneyadvicetrust.org/AdditionalInformationTemplateToolDev/GetQuestionData.aspx?service=" + prefix;
    await fetch(api)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data.questionData.questions);
      })
      .catch((error) => {
        console.log('Error :>> ', error);
      });
  }
  return (
    <div className="App">
      <Header />
      <div className="container">       
          <div className="row top-select">
            <div className="col-3">              
              <SelectField isMulti={false} options={selectPrefix} onChange={showValue} />
            </div>
            <div className="col-2">
            <button onClick={(prefix) => loadData(prefix)}>Check option</button> 
            </div>
          </div>
          
      </div>

      <Main data={data} />
      <br />
      <br />
      <br />
      
      <Footer />
    </div>
  )
}

export default App
