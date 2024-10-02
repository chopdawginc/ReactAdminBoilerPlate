import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CBox from "components/CBox";
import "./styles.css";

interface TextEditorProps {
  title: string;
  previewBtn?: boolean;
  handleSave: () => void;
  data?: string | undefined;
  handlePreview?: () => void;
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  data,
  title,
  onChange,
  previewBtn,
  handleSave,
  handlePreview,
}) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    data && setText(data);
  }, [data]);

  const handleTextChange = (value: string) => {
    setText(value);
    onChange(value);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ color: [] }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
    ],
  };

  const formats = ["bold", "italic", "underline", "color", "align", "list"];

  return (
    <Box display={"flex"} flexDirection={"column"} p={2} gap={2}>
      <Typography variant="h5_bold">{title}</Typography>
      <ReactQuill
        theme="snow"
        value={text}
        formats={formats}
        modules={modules}
        onChange={handleTextChange}
        style={styles.editor}
        placeholder="Write here..."
      />
      <CBox sx={{ alignSelf: "end" }}>
        {previewBtn && (
          <Button variant="contained" onClick={handlePreview}>
            Preview
          </Button>
        )}
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </CBox>
    </Box>
  );
};

const styles = {
  editor: {} as React.CSSProperties,
};

export default TextEditor;
