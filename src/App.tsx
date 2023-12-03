import { useState } from "react";
import Editor from "@monaco-editor/react";
import Header from "./components/Header";

const functionList = [
  "generateName()",
  "generateNumber()",
  "generateBoolean()",
  "generateArray()",
];

export default function App() {
  const [code, setCode] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState("");

  const generateNewJsonCode = (newValue: string | undefined) => {
    setCode(newValue || "");

    const processedString = processInput(newValue);
    setGeneratedCode(processedString);
  };

  function processInput(input: string | undefined) {
    const jsonString = JSON.stringify(input);

    const processedString = jsonString.replace(
      /{{(.*?)}}/g,
      (match, functionCall) => {
        const [func, args] = functionCall.split("("); // Split the function and its arguments
        if (func === "loop") {
          const loopCount = parseInt(args.replace(/\D/g, "")); // Extract the loop count
          let loopContent = "";
          for (let i = 0; i < loopCount; i++) {
            const content = jsonString.replace(/{"{{loop\(\d+\)}}":\[|]}/g, ""); // Remove loop placeholders
            loopContent += content;
          }
          return loopContent;
        } else if (typeof window[func] === "function") {
          // Recursively replace function calls within strings
          return match.replace(`{{${functionCall}}}`, window[func]());
        } else {
          return match;
        }
      }
    );

    // Reconstruct the JSON object
    const processedJSON = JSON.parse(processedString);
    return processedJSON;
  }

  return (
    <div>
      <Header />

      <div className="flex ">
        <div className="basis-[300px]">
          {functionList.map((name: string, index: number) => {
            return (
              <div
                className="px-3 py-2 m-2 rounded-lg cursor-pointer transition hover:bg-zinc-200"
                key={index}
              >
                {name}
              </div>
            );
          })}
        </div>

        <div className="basis-full">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:basis-6/12">
              <Editor
                height="100vh"
                theme="vs-dark"
                defaultLanguage="json"
                onChange={generateNewJsonCode}
                value={code}
                // defaultValue="// some comment"
              />
            </div>

            <div className="lg:basis-6/12">
              <Editor
                height="100vh"
                theme="vs-dark"
                defaultLanguage="json"
                value={generatedCode}
                // defaultValue="// some comment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
