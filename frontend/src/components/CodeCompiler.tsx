import { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Play, RotateCcw, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';

const LANGUAGE_TEMPLATES = {
  python: `# Python Code Editor\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Student"))`,
  javascript: `// JavaScript Code Editor\nfunction greet(name) {\n    return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("Student"));`,
  cpp: `// C++ Code Editor\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, Student!" << endl;\n    return 0;\n}`,
  java: `// Java Code Editor\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Student!");\n    }\n}`,
};

const LANGUAGE_ID_MAP: Record<string, number> = {
  python: 71,
  javascript: 63,
  cpp: 54,
  java: 62,
};

export function CodeCompiler() {
  const [language, setLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>(LANGUAGE_TEMPLATES.python);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(LANGUAGE_TEMPLATES[newLang as keyof typeof LANGUAGE_TEMPLATES]);
    setOutput('');
    setError('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/compiler/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          languageId: LANGUAGE_ID_MAP[language],
        }),
      });

      if (!response.ok) throw new Error('Failed to reach compiler service');

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setOutput('');
      } else {
        setOutput(data.output || 'Code executed successfully (no output).');
        setError('');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E]">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-white/10 bg-[#1A1A1A]">
        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleRun} 
            disabled={isRunning} 
            size="sm" 
            className="h-8 px-3 bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 mr-2" />
            )}
            Run
          </Button>

          <Button 
            onClick={() => setCode(LANGUAGE_TEMPLATES[language as keyof typeof LANGUAGE_TEMPLATES])} 
            variant="ghost" 
            size="sm" 
            className="h-8 text-gray-400 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-2" />
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Powered by Judge0
        </div>
      </div>

      {/* Editor container */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : language}
          value={code}
          theme="vs-dark"
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16 },
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
          }}
        />
      </div>

      {/* Output / Console */}
      <div className="h-40 border-t border-white/10 flex flex-col bg-[#0D0D0D]">
        <div className="px-4 py-1.5 border-b border-white/5 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Output Console</span>
          {error && (
            <div className="flex items-center gap-1 text-[10px] text-rose-500 animate-pulse">
              <AlertCircle className="w-3 h-3" />
              Runtime Error
            </div>
          )}
        </div>
        <div className="flex-1 p-4 font-mono text-sm overflow-auto">
          {error ? (
            <pre className="text-rose-400 whitespace-pre-wrap">{error}</pre>
          ) : (
            <pre className={`${output === 'Running code...' ? 'text-gray-500' : 'text-emerald-400'} whitespace-pre-wrap`}>
              {output || '> Output will appear here...'}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
