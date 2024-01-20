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
  const [success, setSuccess] = useState({
    copy: "",
  });
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

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedCode, null, 2));

    setSuccess({
      ...success,
      copy: "Copied to clipboard",
    });

    setTimeout(() => {
      setSuccess({
        ...success,
        copy: "",
      });
    }, 2000);
  };
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(generatedCode, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const currentTimeStamp = new Date().getTime();
    link.download = `generated-${currentTimeStamp}.json`;
    link.click();
  };

  const loader = <span className="loading loading-spinner loading-lg"></span>;

  const options = {
    fontSize: "13px",
  };

  return (
    <>
      <Header />

      <div className="flex lg:h-[calc(100%-64px)] ">
        <div className="basis-full overflow-y-hidden">
          <div className="flex flex-row ">
            <div className="lg:basis-6/12">
              <Editor
                options={options}
                width={firstContainerWidth}
                loading={loader}
                height="100vh"
                theme="vs-dark"
                defaultLanguage="json"
                onChange={generateNewJsonCode}
                value={code}
              />

              {errors.json && (
                <div className="fixed bottom-[50px] bg-red-600 text-white rounded px-4 py-3">
                  Invalid JSON input
                </div>
              )}

              {success.copy && (
                <div className="fixed bottom-[50px] bg-green-600 text-white rounded px-4 py-3">
                  Copied to clipboard
                </div>
              )}
            </div>

            <div className="lg:basis-6/12 relative">
              <Editor
                options={options}
                width={secondContainerWidth}
                loading={loader}
                height="100vh"
                theme="vs-dark"
                defaultLanguage="json"
                value={JSON.stringify(generatedCode, null, 2) || ""}
              />

              <div className="absolute top-[20px] right-[180px] flex">
                <div className="bg-white rounded mx-1" onClick={handleCopy}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-black cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </div>
                <div className="bg-white rounded mx-1" onClick={handleDownload}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-black cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-zinc-800 z-[999] p-3 flex justify-between">
        <div>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="text-white flex justify-center items-center"
          >
            Made in Bangladesh <img src="/bd-flag.svg" className="mx-2" />
          </a>
        </div>
        <div></div>
      </footer>
    </>
  );
}
