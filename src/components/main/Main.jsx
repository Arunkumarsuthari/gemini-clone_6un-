import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { FaCopy } from "react-icons/fa";
import "./Main.css";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    copyToClipboard,
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

  const handleCardClick = (promptText) => {
    onSent(promptText);
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
                <span>Hello, Beautifull...!</span>
              </p>
              <p>How can I help you Today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={() => handleCardClick("Suggest Some Place To Visit In Kerala")}>
                <p>
                Suggest Some Place To Visit In Kerala
                </p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card" onClick={() => handleCardClick("How to Create a Gyroscope using Disc?")}>
                <p>
                How to Create a Gyroscope using Disc?
                </p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card" onClick={() => handleCardClick("Create a Script for the youtube video about coding")}>
                <p>
                Create a Script for the youtube video about coding
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
                      <div className="result-section-header">
                        <h2>{section.title}</h2>
                        <button
                          className="copy-button"
                          onClick={() => copyToClipboard(section.content)}
                        >
                          <FaCopy />
                        </button>
                      </div>
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
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy & Gemini Apps
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
