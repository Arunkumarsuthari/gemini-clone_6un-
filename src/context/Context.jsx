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
    let currentSection = { title: "Response", content: [] };

    lines.forEach(line => {
      if (line.startsWith("## ")) {
        if (currentSection.title !== "Response") {
          formatted.push(currentSection);
        }
        currentSection = { title: line.substring(3), content: [] };
      } else if (line.startsWith("**")) {
        const htmlText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Handle bold text
        currentSection.content.push({ type: "bullet", text: htmlText });
      } else if (line.trim() !== "") {
        const htmlText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Handle bold text
        currentSection.content.push({ type: "paragraph", text: htmlText });
      }
    });

    if (currentSection.content.length > 0) {
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
      const formattedResponse = formatResponse(text);
      setResultData(formattedResponse);
    } catch (error) {
      console.error("Error in onSent:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const copyToClipboard = (content) => {
    const textToCopy = content.map(item => item.text.replace(/<\/?[^>]+(>|$)/g, "")).join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy!", err);
    });
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
    copyToClipboard,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
