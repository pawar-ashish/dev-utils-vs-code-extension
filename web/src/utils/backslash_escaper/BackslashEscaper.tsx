import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./BackslashEscaper.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface BackslashEscaperProps {
  initialText?: string;
  vscode: any;
}

const BackslashEscaper: React.FC<BackslashEscaperProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [escapedText, setEscapedText] = useState<string>("");

  const escapeBackslashes = (text: string) => {
    return text
      .replace(/\\/g, "\\\\") // Escapes backslashes
      .replace(/\n/g, "\\n") // Escapes new line
      .replace(/\r/g, "\\r") // Escapes carriage return
      .replace(/\t/g, "\\t") // Escapes horizontal tab
      .replace(/\v/g, "\\v") // Escapes vertical tab
      .replace(/\'/g, "\\'") // Escapes single quotation mark
      .replace(/\"/g, '\\"'); // Escapes double quotation mark
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setEscapedText(escapeBackslashes(newText));
  };

  const handleClear = () => {
    setInputText("");
    setEscapedText("");
  };

  return (
    <div className="holder">
      <Header title="Backslash Escaper" />
      <Card className="input-card">
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton
            vscode={vscode}
            text={escapedText}
            label="Copy Escaped Text"
          />
        </div>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Text Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text to be backslash-escaped..."
            />
          </div>

          <div className="text-input">
            <H4>Escaped Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={escapedText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Here's how the Backslash Escaper works:</p>
        <ul className="escape-list">
          <li>
            Backslash becomes <code>\\</code>
          </li>
          <li>
            New line becomes <code>\n</code>
          </li>
          <li>
            Tab becomes <code>\t</code>
          </li>
          <li>
            Carriage return becomes <code>\r</code>
          </li>
          <li>
            Vertical tab becomes <code>\v</code>
          </li>
          <li>
            Single quote becomes <code>\'</code>
          </li>
          <li>
            Double quote becomes <code>\"</code>
          </li>
          <br />
        </ul>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example Text Input</H4>
            <TextArea
              className="example-input"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`String with special characters:
This is a file path: C:\\\\Users\\\\User\\\\Documents\\\\File.txt
New line example: Line 1\nLine 2
Tab example: Column1\tColumn2
Carriage return example: Line A\rLine B
Single quote in string: \'It\'s a sunny day.\'
Double quote in string: "She said, \"Hello!\"`}
            />
          </div>
          <div className="text-input">
            <H4>Expected Escaped Output</H4>
            <TextArea
              className="example-output"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`String with special characters:\\nThis is a file path: C:\\\\\\\\Users\\\\\\\\User\\\\\\\\Documents\\\\\\\\File.txt\\nNew line example: Line 1\\nLine 2\\nTab example: Column1\\tColumn2\\nCarriage return example: Line A\\rLine B\\nSingle quote in string: \\'It\\'s a sunny day.\\'\\nDouble quote in string: \\"She said, \\"Hello!\\"`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BackslashEscaper;
