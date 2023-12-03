import { useState } from "react";
import Editor from "@monaco-editor/react";
import Header from "./components/Header";

export default function App() {
  const [code, setCode] = useState<string>("");

  return (
    <div>
      <Header />

      <div className="flex ">
        <div className="basis-[300px]">
          <div className="px-3 py-2 m-2 rounded-lg cursor-pointer transition hover:bg-zinc-200">
            test()
          </div>

          <div className="px-3 py-2 m-2 rounded-lg cursor-pointer transition hover:bg-zinc-200">
            test()
          </div>

          <div className="px-3 py-2 m-2 rounded-lg cursor-pointer transition hover:bg-zinc-200">
            test()
          </div>

          <div className="px-3 py-2 m-2 rounded-lg cursor-pointer transition hover:bg-zinc-200">
            test()
          </div>

          <div className="px-3 py-2 m-2 rounded-lg cursor-pointer transition hover:bg-zinc-200">
            test()
          </div>
        </div>

        <div className="basis-full">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:basis-6/12">
              <Editor
                height="100vh"
                theme="vs-dark"
                defaultLanguage="json"
                onChange={(value) => {
                  console.log(value);
                  setCode(value ?? "");
                }}
                value={code}
                // defaultValue="// some comment"
              />
            </div>

            <div className="lg:basis-6/12">
              <Editor
                height="100vh"
                theme="vs-dark"
                defaultLanguage="json"
                value={code}
                // defaultValue="// some comment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
