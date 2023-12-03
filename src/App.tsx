import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function App() {
  const [code, setCode] = useState<string>("");

  return (
    <div>
      <p>App</p>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:basis-6/12">
          <Editor
            height="90vh"
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
            height="90vh"
            theme="vs-dark"
            defaultLanguage="json"
            value={code}
            // defaultValue="// some comment"
          />
        </div>
      </div>
    </div>
  );
}
