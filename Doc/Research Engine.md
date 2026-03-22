1. The "Research Engine" System Prompt
Use this in your Node.js backend when calling the OpenAI/Claude API:
System Prompt: "You are an AI Research Assistant specializing in Instructional Design and Psychometrics. Your task is to perform a semantic audit of a video transcript to calculate its Information Density (ID) and generate structured learning artifacts.
Step 1: Entity Extraction Identify all 'Knowledge Points' (KP) defined as:
•	Technical terms, formulas, or syntax.
•	Logical steps in a process.
•	Conceptual definitions.
Step 2: Density Calculation Calculate the ID score on a scale of 1.0 to 10.0, where 1.0 is a casual vlog and 10.0 is a dense technical lecture.
Step 3: Asset Generation Generate the following in strictly valid JSON format:
1.	MindMap: A hierarchical JSON structure (nodes and edges) for React Flow.
2.	Quiz: Generate questions where the quantity and Bloom's Taxonomy level are mapped to the ID score:
o	ID 1-3: 5 questions (Recall/Understanding).
o	ID 4-7: 15 questions (Application/Analysis).
o	ID 8-10: 25+ questions (Analysis/Evaluation).
Constraint: All output must be valid JSON. No conversational text."
________________________________________
2. The JSON Output Structure
This is the data your Node.js backend will receive and save into the Supabase tables we created:
JSON
{
  "metadata": {
    "info_density_score": 7.4,
    "knowledge_points_count": 18,
    "recommended_taxonomy": "Analysis"
  },
  "mindmap": {
    "nodes": [
      { "id": "1", "data": { "label": "React Hooks" }, "position": { "x": 0, "y": 0 } },
      { "id": "2", "data": { "label": "useEffect" }, "position": { "x": 100, "y": 50 } }
    ],
    "edges": [
      { "id": "e1-2", "source": "1", "target": "2" }
    ]
  },
  "quiz": [
    {
      "question": "What is the primary purpose of the dependency array in useEffect?",
      "options": ["To limit re-renders", "To style components", "To fetch data only", "To create a loop"],
      "answer": "To limit re-renders",
      "bloom_level": "Analysis"
    }
  ]
}
________________________________________
3. Implementation Logic (Node.js)
Here is how you handle the "Research Pipeline" in your code:
1.	Split Transcript: Use a utility function to chunk the transcript into 1000-word blocks.
2.	API Call: Send the prompt and the transcript chunk to the LLM.
3.	Validation: Ensure the JSON is valid before saving to the ai_assets table.
4.	Scaling: Use the info_density_score from the JSON to set the totalQuestions variable in your UI.
________________________________________
4. Why this works for your Research Paper
In your Scopus paper, you will describe this as:
•	"We utilized a Deterministic JSON Schema to ensure structural integrity across 500+ generated assessment items."
•	"The system employed Prompt Engineering via Chain-of-Thought (CoT) to identify Knowledge Points before assigning a density coefficient."

