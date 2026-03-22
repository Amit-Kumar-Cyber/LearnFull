import { Video, Note, CheatSheet, Quiz, Course, MindMapNode } from '../types';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Python for Beginners - Full Course',
    youtubeId: 'rfscVS0vtbw',
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    category: 'Programming',
    duration: 60,
    thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
    description: 'Learn Python programming from scratch with this comprehensive tutorial.',
    isCoding: true,
  },
  {
    id: '2',
    title: 'React Complete Tutorial',
    youtubeId: 'Ke90Tje7VS0',
    url: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
    category: 'Web Development',
    duration: 45,
    thumbnail: 'https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg',
    description: 'Master React.js with hooks, components, and state management.',
    isCoding: true,
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    youtubeId: 'c9Wg6Cb_YlU',
    url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
    category: 'Design',
    duration: 30,
    thumbnail: 'https://img.youtube.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg',
    description: 'Learn the essential principles of user interface and user experience design.',
    isCoding: false,
  },
];

export const mockNotes: Record<string, Note> = {
  '1': {
    id: 'n1',
    videoId: '1',
    content: `# Python for Beginners - Notes

## Introduction to Python
- **Python** is a high-level, interpreted programming language
- Known for its simple syntax and readability
- Used in web development, data science, AI, automation, and more

## Variables and Data Types
- Variables don't need explicit declaration
- Common data types:
  - \`int\` - Integer numbers
  - \`float\` - Decimal numbers
  - \`str\` - Strings (text)
  - \`bool\` - Boolean (True/False)
  - \`list\` - Ordered collection
  - \`dict\` - Key-value pairs

### Example:
\`\`\`python
name = "John"
age = 25
is_student = True
\`\`\`

## Control Flow
### If Statements
\`\`\`python
if age >= 18:
    print("Adult")
else:
    print("Minor")
\`\`\`

### Loops
**For Loop:**
\`\`\`python
for i in range(5):
    print(i)
\`\`\`

**While Loop:**
\`\`\`python
while x < 10:
    x += 1
\`\`\`

## Functions
- Reusable blocks of code
- Defined using \`def\` keyword

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

## Lists and Collections
- Lists are mutable (can be changed)
- Access elements by index (0-based)

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
print(fruits[0])  # apple
\`\`\`

## Key Takeaways
✓ Python is beginner-friendly and versatile
✓ Indentation matters in Python (no curly braces)
✓ Dynamic typing - no need to declare variable types
✓ Rich standard library and ecosystem
`,
  },
  '2': {
    id: 'n2',
    videoId: '2',
    content: `# React Complete Tutorial - Notes

## What is React?
- **React** is a JavaScript library for building user interfaces
- Developed and maintained by Meta (Facebook)
- Component-based architecture
- Uses Virtual DOM for efficient updates

## Components
### Functional Components
\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### Component Best Practices
- Keep components small and focused
- One component per file
- Use descriptive names

## JSX (JavaScript XML)
- Syntax extension that looks like HTML
- Allows writing HTML in JavaScript
- Must return a single parent element

\`\`\`jsx
const element = (
  <div>
    <h1>Welcome</h1>
    <p>Getting started with React</p>
  </div>
);
\`\`\`

## State Management with useState
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Effects with useEffect
- Handle side effects (API calls, subscriptions, timers)
- Runs after render

\`\`\`jsx
useEffect(() => {
  // Code runs after component renders
  document.title = \`Count: \${count}\`;
}, [count]); // Dependency array
\`\`\`

## Props
- Pass data from parent to child components
- Read-only (immutable)

\`\`\`jsx
<Welcome name="Sarah" age={25} />
\`\`\`

## Key Concepts
✓ Component composition
✓ Unidirectional data flow (top-down)
✓ Virtual DOM reconciliation
✓ Declarative programming style
`,
  },
  '3': {
    id: 'n3',
    videoId: '3',
    content: `# UI/UX Design Fundamentals - Notes

## What is UI/UX?
- **UI (User Interface)** - Visual elements users interact with
- **UX (User Experience)** - Overall experience and satisfaction
- Both work together to create great products

## Core UX Principles

### 1. User-Centered Design
- Always design with the user in mind
- Conduct user research and testing
- Create user personas and journey maps

### 2. Consistency
- Keep design elements uniform across the product
- Use consistent patterns and interactions
- Build and maintain design systems

### 3. Accessibility
- Design for all users, including those with disabilities
- Follow WCAG guidelines
- Ensure proper color contrast and keyboard navigation

## UI Design Principles

### Visual Hierarchy
- Guide user attention with:
  - **Size** - Larger elements draw more attention
  - **Color** - Bright colors stand out
  - **Contrast** - High contrast creates emphasis
  - **Spacing** - White space improves readability

### Typography
- Choose readable fonts
- Limit to 2-3 font families
- Use appropriate font sizes (16px minimum for body text)
- Maintain proper line height (1.5-1.7 for body text)

### Color Theory
- **Primary color** - Main brand color
- **Secondary colors** - Supporting colors
- **Accent colors** - Call-to-action elements
- Use 60-30-10 rule: 60% dominant, 30% secondary, 10% accent

## Design Process
1. **Research** - Understand users and problems
2. **Ideate** - Brainstorm solutions
3. **Wireframe** - Create low-fidelity layouts
4. **Prototype** - Build interactive mockups
5. **Test** - Validate with real users
6. **Iterate** - Refine based on feedback

## Common UI Patterns
- Navigation menus
- Cards and grids
- Forms and inputs
- Modals and dialogs
- Buttons and CTAs

## Key Takeaways
✓ Good design is invisible
✓ Less is more (simplicity wins)
✓ Mobile-first approach
✓ Test with real users early and often
`,
  },
};

export const mockCheatSheets: Record<string, CheatSheet> = {
  '1': {
    id: 'cs1',
    videoId: '1',
    items: [
      {
        term: 'print()',
        definition: 'Output text to console',
        example: 'print("Hello World")',
      },
      {
        term: 'input()',
        definition: 'Get user input',
        example: 'name = input("Enter name: ")',
      },
      {
        term: 'len()',
        definition: 'Get length of object',
        example: 'len([1, 2, 3])  # Returns 3',
      },
      {
        term: 'range()',
        definition: 'Generate sequence of numbers',
        example: 'range(5)  # 0,1,2,3,4',
      },
      {
        term: 'str.split()',
        definition: 'Split string into list',
        example: '"a,b,c".split(",")  # ["a","b","c"]',
      },
      {
        term: 'list.append()',
        definition: 'Add item to end of list',
        example: 'nums.append(4)',
      },
      {
        term: 'dict.get()',
        definition: 'Get value from dictionary',
        example: 'user.get("name", "Unknown")',
      },
      {
        term: 'try/except',
        definition: 'Handle errors gracefully',
        example: 'try:\n    # code\nexcept:\n    # handle error',
      },
    ],
  },
  '2': {
    id: 'cs2',
    videoId: '2',
    items: [
      {
        term: 'useState',
        definition: 'Hook for state management',
        example: 'const [count, setCount] = useState(0)',
      },
      {
        term: 'useEffect',
        definition: 'Hook for side effects',
        example: 'useEffect(() => { /* code */ }, [deps])',
      },
      {
        term: 'props',
        definition: 'Pass data to components',
        example: '<Component name="John" age={25} />',
      },
      {
        term: 'map()',
        definition: 'Render lists of components',
        example: 'items.map(item => <Item key={item.id} />)',
      },
      {
        term: 'onClick',
        definition: 'Handle click events',
        example: '<button onClick={() => alert("Hi")}>',
      },
      {
        term: 'className',
        definition: 'Add CSS classes (not "class")',
        example: '<div className="container">',
      },
      {
        term: 'Fragment',
        definition: 'Group elements without extra DOM',
        example: '<> ... </>',
      },
      {
        term: 'key',
        definition: 'Unique identifier for list items',
        example: '<Item key={item.id} />',
      },
    ],
  },
  '3': {
    id: 'cs3',
    videoId: '3',
    items: [
      {
        term: 'F-Pattern',
        definition: 'How users scan web pages',
        example: 'Place important content top-left',
      },
      {
        term: 'White Space',
        definition: 'Empty space around elements',
        example: 'Use padding/margin for breathing room',
      },
      {
        term: 'Contrast Ratio',
        definition: 'Difference between colors',
        example: 'Minimum 4.5:1 for normal text',
      },
      {
        term: 'Grid System',
        definition: 'Column-based layout structure',
        example: '12-column grid is common',
      },
      {
        term: 'Call to Action',
        definition: 'Button/link prompting user action',
        example: 'Use high contrast, clear labels',
      },
      {
        term: 'Mobile-First',
        definition: 'Design for mobile, then scale up',
        example: 'Start with 375px width',
      },
      {
        term: 'Gestalt Principles',
        definition: 'How humans perceive visual groups',
        example: 'Proximity, similarity, closure',
      },
      {
        term: 'User Flow',
        definition: 'Path user takes to complete task',
        example: 'Login → Dashboard → Complete Action',
      },
    ],
  },
};

export const mockMindMaps: Record<string, MindMapNode> = {
  '1': {
    id: 'root',
    label: 'Python Basics',
    children: [
      {
        id: 'data-types',
        label: 'Data Types',
        children: [
          { id: 'int', label: 'int' },
          { id: 'str', label: 'str' },
          { id: 'bool', label: 'bool' },
          { id: 'list', label: 'list' },
          { id: 'dict', label: 'dict' },
        ],
      },
      {
        id: 'control-flow',
        label: 'Control Flow',
        children: [
          { id: 'if', label: 'if/else' },
          { id: 'for', label: 'for loops' },
          { id: 'while', label: 'while loops' },
        ],
      },
      {
        id: 'functions',
        label: 'Functions',
        children: [
          { id: 'def', label: 'def keyword' },
          { id: 'params', label: 'Parameters' },
          { id: 'return', label: 'Return values' },
        ],
      },
      {
        id: 'collections',
        label: 'Collections',
        children: [
          { id: 'lists', label: 'Lists' },
          { id: 'tuples', label: 'Tuples' },
          { id: 'sets', label: 'Sets' },
          { id: 'dicts', label: 'Dictionaries' },
        ],
      },
    ],
  },
  '2': {
    id: 'root',
    label: 'React Fundamentals',
    children: [
      {
        id: 'components',
        label: 'Components',
        children: [
          { id: 'functional', label: 'Functional Components' },
          { id: 'jsx', label: 'JSX Syntax' },
          { id: 'props', label: 'Props' },
        ],
      },
      {
        id: 'hooks',
        label: 'React Hooks',
        children: [
          { id: 'useState', label: 'useState' },
          { id: 'useEffect', label: 'useEffect' },
          { id: 'useContext', label: 'useContext' },
          { id: 'useRef', label: 'useRef' },
        ],
      },
      {
        id: 'concepts',
        label: 'Core Concepts',
        children: [
          { id: 'virtual-dom', label: 'Virtual DOM' },
          { id: 'lifecycle', label: 'Component Lifecycle' },
          { id: 'events', label: 'Event Handling' },
        ],
      },
      {
        id: 'patterns',
        label: 'Common Patterns',
        children: [
          { id: 'composition', label: 'Composition' },
          { id: 'lifting', label: 'Lifting State Up' },
          { id: 'conditional', label: 'Conditional Rendering' },
        ],
      },
    ],
  },
  '3': {
    id: 'root',
    label: 'UI/UX Design',
    children: [
      {
        id: 'ux-principles',
        label: 'UX Principles',
        children: [
          { id: 'user-centered', label: 'User-Centered Design' },
          { id: 'consistency', label: 'Consistency' },
          { id: 'accessibility', label: 'Accessibility' },
        ],
      },
      {
        id: 'ui-principles',
        label: 'UI Principles',
        children: [
          { id: 'hierarchy', label: 'Visual Hierarchy' },
          { id: 'typography', label: 'Typography' },
          { id: 'color', label: 'Color Theory' },
          { id: 'spacing', label: 'Spacing & Layout' },
        ],
      },
      {
        id: 'process',
        label: 'Design Process',
        children: [
          { id: 'research', label: 'Research' },
          { id: 'wireframe', label: 'Wireframing' },
          { id: 'prototype', label: 'Prototyping' },
          { id: 'test', label: 'Testing' },
        ],
      },
      {
        id: 'patterns',
        label: 'UI Patterns',
        children: [
          { id: 'navigation', label: 'Navigation' },
          { id: 'forms', label: 'Forms' },
          { id: 'cards', label: 'Cards' },
          { id: 'modals', label: 'Modals' },
        ],
      },
    ],
  },
};

export const mockQuizzes: Record<string, Quiz> = {
  '1': {
    id: 'q1',
    videoId: '1',
    questions: [
      {
        id: 'q1-1',
        question: 'What type of programming language is Python?',
        options: [
          'Compiled and low-level',
          'Interpreted and high-level',
          'Assembly language',
          'Machine code',
        ],
        correctAnswer: 1,
        explanation:
          'Python is an interpreted, high-level programming language known for its readability and ease of use.',
        type: 'mcq',
      },
      {
        id: 'q1-2',
        question: 'Which symbol is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
        explanation:
          'The "def" keyword is used to define functions in Python. Example: def my_function():',
        type: 'mcq',
      },
      {
        id: 'q1-3',
        question: 'Python uses curly braces {} to define code blocks.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'False. Python uses indentation (spaces or tabs) to define code blocks, not curly braces.',
        type: 'boolean',
      },
      {
        id: 'q1-4',
        question: 'What is the output of: print(type([1, 2, 3]))?',
        options: ['<class \'tuple\'>', '<class \'list\'>', '<class \'array\'>', '<class \'dict\'>'],
        correctAnswer: 1,
        explanation:
          '[1, 2, 3] creates a list in Python, so type() returns <class \'list\'>.',
        type: 'mcq',
      },
      {
        id: 'q1-5',
        question: 'Which data type is mutable in Python?',
        options: ['string', 'tuple', 'list', 'integer'],
        correctAnswer: 2,
        explanation:
          'Lists are mutable, meaning they can be modified after creation. Strings, tuples, and integers are immutable.',
        type: 'mcq',
      },
    ],
  },
  '2': {
    id: 'q2',
    videoId: '2',
    questions: [
      {
        id: 'q2-1',
        question: 'What does JSX stand for?',
        options: [
          'JavaScript XML',
          'Java Syntax Extension',
          'JavaScript Extension',
          'JSON XML',
        ],
        correctAnswer: 0,
        explanation:
          'JSX stands for JavaScript XML. It allows you to write HTML-like code in JavaScript.',
        type: 'mcq',
      },
      {
        id: 'q2-2',
        question: 'Which hook is used for state management in functional components?',
        options: ['useContext', 'useState', 'useEffect', 'useReducer'],
        correctAnswer: 1,
        explanation:
          'useState is the primary hook for managing state in functional components.',
        type: 'mcq',
      },
      {
        id: 'q2-3',
        question: 'React components must return multiple parent elements.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'False. React components must return a single parent element. You can use fragments (<> </>) to wrap multiple elements.',
        type: 'boolean',
      },
      {
        id: 'q2-4',
        question: 'What is the correct way to add a CSS class to a React element?',
        options: ['class="container"', 'className="container"', 'css="container"', 'style="container"'],
        correctAnswer: 1,
        explanation:
          'In React, you use "className" instead of "class" because "class" is a reserved word in JavaScript.',
        type: 'mcq',
      },
      {
        id: 'q2-5',
        question: 'Props in React are read-only and cannot be modified by child components.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation:
          'True. Props are immutable and flow down from parent to child components in a unidirectional data flow.',
        type: 'boolean',
      },
    ],
  },
  '3': {
    id: 'q3',
    videoId: '3',
    questions: [
      {
        id: 'q3-1',
        question: 'What does UI stand for?',
        options: [
          'User Interface',
          'Universal Integration',
          'Unified Input',
          'User Interaction',
        ],
        correctAnswer: 0,
        explanation:
          'UI stands for User Interface - the visual elements that users interact with.',
        type: 'mcq',
      },
      {
        id: 'q3-2',
        question: 'What is the minimum recommended contrast ratio for normal text?',
        options: ['3:1', '4.5:1', '7:1', '2:1'],
        correctAnswer: 1,
        explanation:
          'WCAG guidelines recommend a minimum contrast ratio of 4.5:1 for normal text to ensure accessibility.',
        type: 'mcq',
      },
      {
        id: 'q3-3',
        question: 'White space in design is wasted space that should be filled with content.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'False. White space (negative space) is crucial for readability, visual hierarchy, and creating a clean, professional design.',
        type: 'boolean',
      },
      {
        id: 'q3-4',
        question: 'Which design approach starts with mobile screen sizes first?',
        options: [
          'Desktop-first',
          'Mobile-first',
          'Tablet-first',
          'Responsive-first',
        ],
        correctAnswer: 1,
        explanation:
          'Mobile-first design means starting with mobile screen sizes and progressively enhancing for larger screens.',
        type: 'mcq',
      },
      {
        id: 'q3-5',
        question: 'What is the recommended minimum font size for body text on the web?',
        options: ['12px', '14px', '16px', '18px'],
        correctAnswer: 2,
        explanation:
          '16px is the recommended minimum for body text to ensure readability across devices.',
        type: 'mcq',
      },
    ],
  },
};

export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'Complete Python Programming',
    description: 'Master Python from basics to advanced topics',
    videos: [mockVideos[0]],
    category: 'Programming',
    thumbnail: mockVideos[0].thumbnail,
  },
  {
    id: 'c2',
    title: 'Modern Web Development',
    description: 'Build modern web apps with React and JavaScript',
    videos: [mockVideos[1]],
    category: 'Web Development',
    thumbnail: mockVideos[1].thumbnail,
  },
  {
    id: 'c3',
    title: 'Design Masterclass',
    description: 'Learn UI/UX design from industry experts',
    videos: [mockVideos[2]],
    category: 'Design',
    thumbnail: mockVideos[2].thumbnail,
  },
];
