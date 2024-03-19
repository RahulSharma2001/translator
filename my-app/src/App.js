import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("hi");
  const [translatedText, setTranslatedText] = useState("");
  const apiKey = "43a63efb70msh4a77d3947ed878bp15e4b9jsn6cc6f0370345";
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", sourceLanguage);
  encodedParams.set("target_language", targetLanguage);
  encodedParams.set("text", text);
  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  async function translate() {
    try {
      if (sourceLanguage === targetLanguage) {
        return;
      }
      let res = await axios.request(options);
      setTranslatedText(res.data.data.translatedText);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div>
        <h1>Translator</h1>
        <div>
          <input
            type="text"
            placeholder="Enter text to translate"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
        </div>
        <select onChange={(event) => setSourceLanguage(event.target.value)}>
          <option value="en">English</option>
          <option value="hi">hindi</option>
          <option value="de">German</option>
        </select>
        <select onChange={(event) => setTargetLanguage(event.target.value)}>
          <option value="en">English</option>
          <option value="hi">hindi</option>
          <option value="de">German</option>
        </select>
        <button onClick={translate}>Translate!</button>
        <div>
          <h3 style={{ border: "1px solid", padding: "5px" }}>
            {sourceLanguage !== targetLanguage ? translatedText : text}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
