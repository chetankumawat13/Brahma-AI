import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ children, language }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      customStyle={{
        borderRadius: "10px",
        padding: "16px",
        margin: "16px 0",
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;