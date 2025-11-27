# AI Implementation Guide

## Model Selection
- **Provider**: Google
- **Model**: gemini-1.5-pro
- **Capabilities**: Text generation, Code analysis, Long context window (ideal for code reviews)

## Implementation Strategy
1. **SDK**: Use `@google/genai` SDK (latest).
2. **Auth**: Initialize with `GOOGLE_API_KEY` from environment variables.
3. **Convex Action**: Create `generateText` action in `convex/ai/generate.ts`.
4. **Prompting**: Use system instructions to act as a "Senior React Engineer".

## Code Example
```typescript
import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
```
