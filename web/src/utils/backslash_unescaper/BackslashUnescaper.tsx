import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./BackslashUnescaper.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface BackslashUnescaperProps {
  initialText?: string;
  vscode: any;
}

const BackslashUnescaper: React.FC<BackslashUnescaperProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [unescapedText, setUnescapedText] = useState<string>("");

  const unescapeBackslashes = (text: string) => {
    return text
      .replace(/\\\\/g, "\\") // Unescapes backslashes
      .replace(/\\n/g, "\n") // Unescapes new line
      .replace(/\\r/g, "\r") // Unescapes carriage return
      .replace(/\\t/g, "\t") // Unescapes horizontal tab
      .replace(/\\v/g, "\v") // Unescapes vertical tab
      .replace(/\\'/g, "'") // Unescapes single quotation mark
      .replace(/\\"/g, '"'); // Unescapes double quotation mark
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setUnescapedText(unescapeBackslashes(newText));
  };

  const handleClear = () => {
    setInputText("");
    setUnescapedText("");
  };

  return (
    <div className="holder">
      <Header title="Backslash Unescaper" />
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
            text={unescapedText}
            label="Copy Unescaped Text"
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
              placeholder="Enter text with escaped backslashes..."
            />
          </div>

          <div className="text-input">
            <H4>Unescaped Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={unescapedText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Here's how the Backslash Unescaper works:</p>
        <ul className="unescape-list">
          <li>
            Escaped backslash <code>\\</code> becomes Backslash <code>\</code>
          </li>
          <li>
            Escaped new line <code>\n</code> becomes New line
          </li>
          <li>
            Escaped tab <code>\t</code> becomes Tab
          </li>
          <li>
            Escaped carriage return <code>\r</code> becomes Carriage return
          </li>
          <li>
            Escaped vertical tab <code>\v</code> becomes Vertical tab
          </li>
          <li>
            Escaped single quote <code>\'</code> becomes Single quote{" "}
            <code>'</code>
          </li>
          <li>
            Escaped double quote <code>\"</code> becomes Double quote{" "}
            <code>"</code>
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
              value={`String with special characters:\\nThis is a file path: C:\\\\\\\\Users\\\\\\\\User\\\\\\\\Documents\\\\\\\\File.txt\\nNew line example: Line 1\\nLine 2\\nTab example: Column1\\tColumn2\\nCarriage return example: Line A\\rLine B\\nSingle quote in string: \\'It\\'s a sunny day.\\'\\nDouble quote in string: \\"She said, \\"Hello!\\"`}
            />
          </div>

          <div className="text-input">
            <H4>Expected Unescaped Output</H4>
            <TextArea
              className="example-output"
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
        </div>
      </Card>
    </div>
  );
};

export default BackslashUnescaper;
