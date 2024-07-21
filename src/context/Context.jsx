import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  // State variables
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false); // Set to false initially to show greeting
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState([]);

  const formatResponse = (text) => {
    const lines = text.split("\n");
    const formatted = [];
    let currentSection = null;
  
    lines.forEach(line => {
      if (line.startsWith("## ")) {
        if (currentSection) {
          formatted.push(currentSection);
        }
        currentSection = { title: line.substring(3), content: [] };
      } else if (line.startsWith("* ")) {
        if (currentSection) {
          currentSection.content.push({ type: "bullet", text: line.substring(2) });
        }
      } else if (line.trim() !== "") {
        if (currentSection) {
          // Convert markdown-style bold text to HTML <strong> tags
          const htmlText = line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Handle bold text
          currentSection.content.push({ type: "paragraph", text: htmlText });
        }
      }
    });
  
    if (currentSection) {
      formatted.push(currentSection);
    }
  
    return formatted;
  };
  
  
  

  const onSent = async (prompt) => {
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    setResultData([]);
  
    try {
      const response = await run(prompt);
      const text = await response.text();
      console.log("Formatted Response:", formatResponse(text)); // Log formatted response
      setResultData(formatResponse(text));
    } catch (error) {
      console.error("Error in onSent:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };
  

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
