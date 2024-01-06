import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Header from "./components/Header";

// const functionList: string[] = [
//   "generateName()",
//   "generateNumber()",
//   "generateBoolean()",
//   "generateArray()",
// ];

export default function App() {
  // const firstContainer = useRef(null);
  // const secondContainer = useRef(null);

  const [firstContainerWidth, setFirstContainerWidth] = useState(window.innerWidth / 2);
  const [secondContainerWidth, setSecondContainerWidth] = useState(window.innerWidth / 2);

  useEffect(() => {
    window.addEventListener("resize", () => {
      // console.log(firstContainer.current.offsetWidth);

      // half of window.innerWidth
      setFirstContainerWidth(window.innerWidth / 2);
      setSecondContainerWidth(window.innerWidth / 2);

      // setFirstContainerWidth(firstContainer.current.offsetWidth);
      // setSecondContainerWidth(secondContainer.current.offsetWidth);
    });
  }, []);

  return (
    <div className="">
      <Header />

      {/* <input
        type="range"
        value={width / 10}
        onChange={(e) => setWidth(parseInt(e.target.value) * 10)}
      /> */}

      <div className="flex lg:h-[calc(100%-64px)] ">
        {/* <div className="w-[300px]">
          sidebar */}
        {/* {functionList.map((name: string, index: number) => {
            return (
              <div
                className="px-3 py-2 m-2 rounded-lg cursor-pointer transition hover:bg-zinc-200"
                key={index}
              >
                {name}
              </div>
            );
          })} */}

        {/* </div> */}

        <div className="basis-full overflow-y-hidden">
          <div className="flex flex-row ">
            {/* content */}
            <div className="lg:basis-6/12">
              {/* <input type="range" /> */}
              <Editor
                width={firstContainerWidth}
                height="100vh"
                // height={`${screenHeight - 64}px`}
                theme="vs-dark"
                defaultLanguage="json"
                // value={generatedCode}
                // defaultValue="// some comment"
              />
            </div>

            <div className="lg:basis-6/12">
              <Editor
                width={secondContainerWidth}
                height="100vh"
                // height={`${screenHeight - 64}px`}
                theme="vs-dark"
                defaultLanguage="json"
                // value={generatedCode}
                // defaultValue="// some comment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function App2() {
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
    <div className="dev h-screen">
      <Header />

      <div className="flex h-fit">
        <div className="basis-[300px]">
          {/* {functionList.map((name: string, index: number) => {
            return (
              <div
                className="px-3 py-2 m-2 rounded-lg cursor-pointer transition hover:bg-zinc-200"
                key={index}
              >
                {name}
              </div>
            );
          })} */}

          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* <!-- Page content here --> */}
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* <!-- Sidebar content here --> */}
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="basis-full  dev">
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
