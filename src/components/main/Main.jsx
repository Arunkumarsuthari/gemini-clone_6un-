import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        onSent(input);
      }
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener('keydown', handleKeyDown);

    return () => {
      inputElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, onSent]);

  const renderContent = (content) => {
    return content.map((item, index) => {
      if (item.type === "paragraph") {
        return <p key={index} dangerouslySetInnerHTML={{ __html: item.text }}></p>;
      } else if (item.type === "bullet") {
        return <li key={index} dangerouslySetInnerHTML={{ __html: item.text }}></li>;
      } else {
        return null;
      }
    });
  };
  

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Bindu...!</span>
              </p>
              <p>How can I help you Today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>
                  Suggest upcoming sbc content Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. !
                </p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>
                  Suggest upcoming sbc content Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. !
                </p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>
                  Suggest upcoming sbc content Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. !
                </p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data-container">
              <img className="fixed-icon" src={assets.gemini_icon} alt="Gemini Icon" />
              <div className="result-data">
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  resultData.map((section, index) => (
                    <div key={index} className="result-section">
                      <h2>{section.title}</h2>
                      <ul>{renderContent(section.content)}</ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              ref={inputRef}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter your prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              {input.trim() && (
                <img
                  onClick={() => onSent(input)}
                  src={assets.send_icon}
                  alt="Send Icon"
                />
              )}
            </div>
          </div>
          <div className="bottom-info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, a
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
