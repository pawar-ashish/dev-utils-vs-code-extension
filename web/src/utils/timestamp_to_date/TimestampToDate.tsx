import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./TimestampToDate.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface TimestampToDateProps {
  initialTimestamp?: string;
  vscode: any;
}

const TimestampToDate: React.FC<TimestampToDateProps> = ({
  initialTimestamp = "",
  vscode = null,
}) => {
  const [timestampText, setTimestampText] = useState<string>(initialTimestamp);
  const [dateText, setDateText] = useState<string>("");
  const [isoText, setIsoText] = useState<string>("");
  const [localDateText, setLocalDateText] = useState<string>("");

  const convertTimestampToDate = (timestampStr: string) => {
    const timestamp = Number(timestampStr);
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
      setDateText(date.toUTCString());
      setIsoText(date.toISOString());
      setLocalDateText(date.toString());
    } else {
      setDateText("Invalid timestamp");
      setIsoText("");
      setLocalDateText("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTimestampText = e.target.value;
    setTimestampText(newTimestampText);
    if (newTimestampText.trim() === "") {
      // Clear all outputs if input is empty
      setDateText("");
      setIsoText("");
      setLocalDateText("");
    } else {
      convertTimestampToDate(newTimestampText);
    }
  };

  const handleClear = () => {
    setTimestampText("");
    setDateText("");
    setIsoText("");
    setLocalDateText("");
  };

  return (
    <div className="holder">
      <Header title="Unix Timestamp to Date Converter" />
      <Card className="input-card">
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
        </div>

        <H4>Unix Timestamp Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={timestampText}
          onChange={handleInputChange}
          placeholder="Enter Unix timestamp here..."
        />

        <H4>Date Time (UTC)</H4>
        <div className="text-inputs">
          <TextArea
            autoResize={true}
            fill={true}
            large={true}
            readOnly={true}
            value={dateText}
            className="text-input"
            placeholder="Result will be displayed here..."
          />
          <div className="copy-button">
            <CopyButton vscode={vscode} text={dateText} label="Copy" />
          </div>
        </div>

        <H4>ISO 8601</H4>
        <div className="text-inputs">
          <TextArea
            autoResize={true}
            fill={true}
            large={true}
            readOnly={true}
            value={isoText}
            className="text-input"
            placeholder="Result will be displayed here..."
          />
          <div className="copy-button">
            <CopyButton vscode={vscode} text={isoText} label="Copy" />
          </div>
        </div>

        <H4>Date Time (Your Time Zone)</H4>
        <div className="text-inputs">
          <TextArea
            autoResize={true}
            fill={true}
            large={true}
            readOnly={true}
            value={localDateText}
            className="text-input"
            placeholder="Result will be displayed here..."
          />
          <div className="copy-button">
            <CopyButton vscode={vscode} text={localDateText} label="Copy" />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>
          Below is an example of how to use the Timestamp to Date Converter:
        </p>

        <H4>Example Timestamp Input</H4>

        <TextArea
          className="example-input"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value="1694006400"
          placeholder="Example timestamp will be displayed here..."
        />

        <H4>Date Time (UTC)</H4>

        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          className="example-input"
          value="Wed, 06 Sep 2023 13:20:00 GMT"
          placeholder="Example date in UTC will be displayed here..."
        />

        <H4>ISO 8601</H4>

        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          className="example-input"
          value="2023-09-06T13:20:00Z"
          placeholder="Example ISO 8601 date will be displayed here..."
        />

        <H4>Date Time (Your Time Zone)</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          className="example-input"
          value="Wed, 06 Sep 2023 15:20:00 CEST" // Adjust based on the example
          placeholder="Example date in your time zone will be displayed here..."
        />
      </Card>
    </div>
  );
};

export default TimestampToDate;
