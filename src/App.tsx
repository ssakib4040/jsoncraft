import { lazy, useEffect, useState } from "react";
// import Editor from "@monaco-editor/react";
import Header from "./components/Header";

const Editor = lazy(() => import("@monaco-editor/react"));

import utils from "./utils";
import { defaultCode } from "./utils/constants";

export default function App() {
  const [code, setCode] = useState<string>(defaultCode);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isInvalidJson, setIsInvalidJson] = useState(false);

  useEffect(() => {
    const processedString = finalProcessedInput(code) as string;

    if (!processedString) return;

    setGeneratedCode(JSON.parse(processedString));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const [firstContainerWidth, setFirstContainerWidth] = useState(
    window.innerWidth / 2
  );
  const [secondContainerWidth, setSecondContainerWidth] = useState(
    window.innerWidth / 2
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setFirstContainerWidth(window.innerWidth / 2);
      setSecondContainerWidth(window.innerWidth / 2);
    });
  }, []);

  function generateNewJsonCode(newValue: string | undefined) {
    setCode(newValue || "");

    const processedString = finalProcessedInput(code) as string;
    setGeneratedCode(JSON.parse(processedString));
  }

  function processForeachString(jsonString: unknown[]): string {
    const regex = /{{for\((\d+)\)}}/g;
    const matches = jsonString.toString().match(regex);

    if (!matches) return JSON.stringify(jsonString);

    const matchedNumber = matches[0]?.match(/\d+/g)?.[0];

    const parsedNumber = parseInt(matchedNumber as string);

    console.log();

    jsonString.shift();

    const newJson: unknown[] = [];

    for (let i = 0; i < parsedNumber; i++) {
      jsonString.forEach((element) => {
        newJson.push(element);
      });
    }

    return JSON.stringify(newJson);
  }

  function processTemplateString(jsonString: string): string {
    const regex = /{{(\w+)\(\)}}/g;
    const matches = jsonString.toString().match(regex);

    if (!matches) return jsonString;

    const data = jsonString.replace(regex, (match, functionName) => {
      // @ts-expect-error intentionally using bracket notation
      if (utils[functionName] && typeof utils[functionName] === "function") {
        // @ts-expect-error intentionally using bracket notation
        return utils[functionName]();
      }
      return match; // Return placeholder if function doesn't exist in utils
    });

    return data;
  }

  function finalProcessedInput(jsonString: string): string | null {
    try {
      JSON.parse(jsonString);
    } catch (error) {
      console.error("Error: Invalid JSON input");
      setIsInvalidJson(true);
      return null;
    }

    setIsInvalidJson(false);

    const parsedData: unknown[] = JSON.parse(jsonString);

    // detect for expression
    const postForeachProcessedString: string = processForeachString(parsedData);
    const templateStringData = processTemplateString(
      postForeachProcessedString
    );
    return templateStringData;
  }

  const loader = <span className="loading loading-spinner loading-lg"></span>;

  return (
    <>
      <Header />

      <div className="flex lg:h-[calc(100%-64px)] ">
        <div className="basis-full overflow-y-hidden">
          <div className="flex flex-row ">
            <div className="lg:basis-6/12">
              <Editor
                width={firstContainerWidth}
                loading={loader}
                height="100vh"
                theme="vs-dark"
                defaultLanguage="json"
                onChange={generateNewJsonCode}
                value={code}
              />

              {isInvalidJson && (
                <div className="fixed bottom-0 bg-red-600 text-white rounded px-4 py-3">
                  Invalid JSON input
                </div>
              )}
            </div>

            <div className="lg:basis-6/12">
              <Editor
                width={secondContainerWidth}
                loading={loader}
                height="100vh"
                theme="vs-dark"
                defaultLanguage="json"
                value={JSON.stringify(generatedCode, null, 2) || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
