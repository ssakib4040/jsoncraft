import { lazy, useEffect, useState } from "react";
// import Editor from "@monaco-editor/react";
import Header from "./components/Header";

const Editor = lazy(() => import("@monaco-editor/react"));

import utils from "./utils";
import { defaultCode } from "./utils/constants";

export default function App() {
  const [code, setCode] = useState<string>(defaultCode);
  const [generatedCode, setGeneratedCode] = useState("");

  // console.log("deb", generatedCode);

  useEffect(() => {
    const processedString: any = finalProcessedInput(code);

    // console.log("deb", processedString)

    setGeneratedCode(processedString);
  }, []);

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

  const generateNewJsonCode = (newValue: string) => {
    setCode(newValue || "");

    const processedString: any = finalProcessedInput(newValue);
    setGeneratedCode(processedString);
  };

  // const jsonString = `[
  //   "{{for(10)}}",
  //   {
  //     "name": "{{test22()}}",
  //     "age": 123
  //   }
  // ]`;

  function processForeachString(jsonString: string) {
    const regex = /{{for\((\d+)\)}}/g;
    const matches = jsonString.toString().match(regex);

    if (!matches) return jsonString;

    const matchedNumber = matches[0].match(/\d+/g)[0];
    const parsedNumber = parseInt(matchedNumber);

    jsonString.shift();

    const newJson = [];

    for (let i = 0; i < parsedNumber; i++) {
      jsonString.forEach((element) => {
        newJson.push(element);
      });
    }

    return JSON.stringify(newJson);
  }

  function processTemplateString(jsonString: string) {
    const regex = /{{(\w+)\(\)}}/g;
    const matches = jsonString.toString().match(regex);

    if (!matches) return jsonString;

    const data = jsonString.replace(regex, (match, functionName) => {
      if (utils[functionName] && typeof utils[functionName] === "function") {
        return utils[functionName]();
      }
      return match; // Return placeholder if function doesn't exist in utils
    });

    // const matchedString = matches[0].match(/\w+/g)[0];

    // console.log(utils);

    // jsonString = jsonString.replace(matches[0], utils[matchedString]());

    return data;
  }

  function finalProcessedInput(jsonString: string) {
    // console.log(utils)
    try {
      JSON.parse(jsonString);
    } catch (error) {
      console.error(error);
      return;
    }

    const parsedData = JSON.parse(jsonString);

    // detect for expression
    const data = processForeachString(parsedData);
    const templateStringData = processTemplateString(data);
    return templateStringData;

    // setGeneratedCode(templateStringData);
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
