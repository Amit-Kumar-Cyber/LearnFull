import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, X } from 'lucide-react';

interface CodeEditorProps {
  language: string;
}

const defaultCode: Record<string, string> = {
  javascript: `function greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));`,
  python: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
};

export default function CodeEditor({ language }: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode[language] || defaultCode.javascript);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setShowOutput(true);

    setTimeout(() => {
      if (language === 'javascript') {
        try {
          const logs: string[] = [];
          const originalLog = console.log;
          console.log = (...args: any[]) => {
            logs.push(args.join(' '));
          };

          eval(code);

          console.log = originalLog;
          setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        } catch (error: any) {
          setOutput(`Error: ${error.message}`);
        }
      } else {
        setOutput(
          `Note: Full compiler integration requires backend API.\nYour ${language} code is ready to run:\n\n${code}`
        );
      }
      setIsRunning(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          Language: <span className="text-blue-600">{language}</span>
        </div>
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition flex items-center space-x-2 disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          <span>{isRunning ? 'Running...' : 'Run Code'}</span>
        </button>
      </div>

      <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      {showOutput && (
        <div className="mt-3 bg-gray-900 text-gray-100 rounded-lg p-4 relative">
          <button
            onClick={() => setShowOutput(false)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-800 rounded"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-xs font-medium text-gray-400 mb-2">OUTPUT:</div>
          <pre className="text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
