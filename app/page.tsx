"use client";

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { editor } from "monaco-editor";

const Editor = lazy(() => import("@monaco-editor/react"));

import { defaultCode } from "@/src/utils/constants";
import utils from "@/src/utils";

import {
  isValidJson,
  processForeachString,
  processTemplateString,
} from "@/src/utils/internal";

const functionDescriptions: Record<string, string> = {
  uuid: "Generates a random UUID.",
  fullName: "Creates a realistic full name.",
  firstName: "Creates a random first name.",
  lastName: "Creates a random last name.",
  age: "Returns an age between 18 and 100.",
  gender: "Picks male, female, or other.",
  email: "Builds a random email address.",
  phone: "Builds a phone number.",
  boolean: "Returns true or false randomly.",
  profileImage: "Creates an avatar image URL.",
  password: "Creates a secure random password.",
  username: "Creates a random username.",
  imei: "Generates an IMEI number.",
  color: "Generates an RGB color.",
  productName: "Creates a product name.",
  product: "Creates a product category.",
  productPrice: "Creates a product price string.",
  companyName: "Creates a company name.",
  date: "Generates a random date.",
  bitcoinAddress: "Creates a Bitcoin address.",
  creditCard: "Creates a credit card number.",
  ethereumAddress: "Creates an Ethereum address.",
  pin: "Creates an account/pin-like number.",
  imageUrl: "Creates a random image URL.",
  imageBase64: "Creates a base64 image data URI.",
  emoji: "Returns a random emoji.",
  ip: "Generates an IP address.",
  ipv4: "Generates an IPv4 address.",
  ipv6: "Generates an IPv6 address.",
  mac: "Generates a MAC address.",
  city: "Creates a random city name.",
  country: "Creates a random country name.",
  countryCode: "Creates a random country code.",
  street: "Creates a random street name.",
  streetAddress: "Creates a random street address.",
  timeZone: "Creates a random timezone.",
  zipCode: "Creates a random zip code.",
};

export default function Page() {
  const [code, setCode] = useState<string>(defaultCode);
  const [generatedCode, setGeneratedCode] = useState<string>("[]");
  const [copyStatus, setCopyStatus] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [functionSearch, setFunctionSearch] = useState("");

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const apiFunctions = useMemo(() => Object.keys(utils), []);
  const filteredFunctions = useMemo(() => {
    const value = functionSearch.trim().toLowerCase();

    if (!value) {
      return apiFunctions;
    }

    return apiFunctions.filter((name) => name.toLowerCase().includes(value));
  }, [apiFunctions, functionSearch]);

  useEffect(() => {
    const processedString = finalProcessedInput(code);
    if (!processedString) {
      return;
    }

    try {
      const parsedOutput = JSON.parse(processedString);
      setGeneratedCode(JSON.stringify(parsedOutput, null, 2));
    } catch (_error) {
      setJsonError("Processed output is not valid JSON.");
      setGeneratedCode("[]");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  function generateNewJsonCode(newValue: string | undefined) {
    setCode(newValue || "");
  }

  function finalProcessedInput(jsonString: string): string | null {
    if (!isValidJson(jsonString)) {
      setJsonError("Invalid JSON input");
      return null;
    }

    setJsonError("");
    const parsedData = JSON.parse(jsonString);
    const normalizedData: unknown[] = Array.isArray(parsedData)
      ? parsedData
      : [parsedData];

    const postForeachProcessedString = processForeachString(normalizedData);
    const templateStringData = processTemplateString(
      postForeachProcessedString,
    );
    return templateStringData;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopyStatus("Copied output JSON");

    setTimeout(() => {
      setCopyStatus("");
    }, 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const currentTimeStamp = new Date().getTime();
    link.download = `generated-${currentTimeStamp}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCode(defaultCode);
    setCopyStatus("");
    setJsonError("");
  };

  const insertFunctionToken = (functionName: string) => {
    const token = `{{${functionName}()}}`;
    const currentEditor = editorRef.current;

    if (!currentEditor) {
      setCode((prev) => `${prev}${prev.endsWith("\n") ? "" : "\n"}${token}`);
      return;
    }

    const selection = currentEditor.getSelection();
    if (!selection) {
      return;
    }

    currentEditor.executeEdits("insert-function-token", [
      {
        range: selection,
        text: token,
        forceMoveMarkers: true,
      },
    ]);

    currentEditor.focus();
    setCode(currentEditor.getValue());
  };

  const fallbackLoader = <div className="editor-loader">Loading editor...</div>;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="brand-kicker">Data Template Studio</p>
          <h1 className="brand-title">JSONCraft</h1>
        </div>
        <a
          href="https://github.com/ssakib4040/jsoncraft"
          target="_blank"
          rel="noreferrer"
          className="repo-link"
        >
          View on GitHub
        </a>
      </header>

      <main className="workspace-grid">
        <aside className="panel panel-functions">
          <div className="panel-header">
            <h2>API Function Suggestions</h2>
            <p>Click any function to insert into input editor.</p>
          </div>

          <input
            value={functionSearch}
            onChange={(event) => setFunctionSearch(event.target.value)}
            placeholder="Search function..."
            className="function-search"
          />

          <div className="function-list" role="list">
            {filteredFunctions.map((functionName) => (
              <button
                key={functionName}
                type="button"
                onClick={() => insertFunctionToken(functionName)}
                className="function-item"
              >
                <span className="function-signature">{`{{${functionName}()}}`}</span>
                <span className="function-description">
                  {functionDescriptions[functionName] ||
                    "Generates dynamic value with faker."}
                </span>
              </button>
            ))}

            {!filteredFunctions.length && (
              <p className="empty-functions">
                No function matched your search.
              </p>
            )}
          </div>
        </aside>

        <section className="panel panel-editor">
          <div className="panel-header panel-header-inline">
            <div>
              <h2>Template Input</h2>
              <p>Write JSON with tokens like {"{{firstName()}}"}.</p>
            </div>
            <button type="button" className="ghost-btn" onClick={handleReset}>
              Reset sample
            </button>
          </div>

          <div className="editor-wrap">
            <Suspense fallback={fallbackLoader}>
              <Editor
                loading={fallbackLoader}
                height="100%"
                theme="vs-dark"
                defaultLanguage="json"
                onMount={(editorInstance) => {
                  editorRef.current = editorInstance;
                }}
                onChange={generateNewJsonCode}
                value={code}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "IBM Plex Mono, monospace",
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                }}
              />
            </Suspense>
          </div>
        </section>

        <section className="panel panel-output">
          <div className="panel-header panel-header-inline">
            <div>
              <h2>Generated Output</h2>
              <p>Preview result after template processing.</p>
            </div>

            <div className="output-actions">
              <button type="button" className="ghost-btn" onClick={handleCopy}>
                Copy
              </button>
              <button
                type="button"
                className="accent-btn"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>

          <div className="editor-wrap">
            <Suspense fallback={fallbackLoader}>
              <Editor
                loading={fallbackLoader}
                height="100%"
                theme="vs-dark"
                defaultLanguage="json"
                value={generatedCode}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "IBM Plex Mono, monospace",
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                }}
              />
            </Suspense>
          </div>
        </section>
      </main>

      {(jsonError || copyStatus) && (
        <div className={`status-toast ${jsonError ? "error" : "success"}`}>
          {jsonError || copyStatus}
        </div>
      )}

      <footer className="app-footer">
        <a
          href="https://github.com/ssakib4040/jsoncraft"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          Made in Bangladesh <img src="/bd-flag.svg" className="flag" />
        </a>
      </footer>
    </div>
  );
}
