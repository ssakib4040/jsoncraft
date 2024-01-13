import { lazy, useEffect, useState } from "react";
import Header from "./components/Header";

const Editor = lazy(() => import("@monaco-editor/react"));

import { defaultCode } from "./utils/constants";

import {
  isValidJson,
  processForeachString,
  processTemplateString,
} from "./utils/internal";

export default function App() {
  const [code, setCode] = useState<string>(defaultCode);
  const [generatedCode, setGeneratedCode] = useState("");
  const [errors, setErrors] = useState({
    json: "",
  });

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

    const processedString: string = finalProcessedInput(code) as string;
    setGeneratedCode(JSON.parse(processedString));
  }

  function finalProcessedInput(jsonString: string): string | null {
    if (!isValidJson(jsonString)) {
      setErrors({
        ...errors,
        json: "Invalid JSON input",
      });
      return null;
    }

    setErrors({
      ...errors,
      json: "",
    });
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

              {errors.json && (
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
