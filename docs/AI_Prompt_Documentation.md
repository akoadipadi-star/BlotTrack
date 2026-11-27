# AI Prompt Documentation – BlotTrack

## Project Information

- **Project Name:** BlotTrack: Barangay Digital Blotter and Case Management Platform
- **Development Tool:** Visual Studio Code
- **Frontend Technology:** React, Vite, CSS
- **AI Tools Used:** ChatGPT, Gemini

---

## Prompt 1: Initial Project Setup

**AI Tool:** ChatGPT

**Purpose:** To guide the initial setup of the React frontend using Vite.

**Prompt Used:**

I already created a Git repository for our website and cloned it into Visual Studio Code, but the repository is currently empty. I want to start developing our website using React, and we only need to complete the frontend for now.

Can you guide me through the entire initial setup and frontend development process step-by-step? Assume I am still learning React, so please explain things simply and don't skip steps.

Please guide me through the following:

How to check if Node.js and npm are installed.

How to initialize a React project inside my existing cloned Git repository without creating another repository or folder.

How to properly organize the folders and files for a React project.

What packages or libraries I should install and why.

How to run the website locally.

How to start developing the frontend, including the layout, reusable components, pages, navigation, and functionality.

How to use Git to save and push my progress.

Provide exact terminal commands, folder structures, and complete code whenever we start creating or modifying a file. Explain what each step does and wait for me to finish a step before moving to the next one.

We only need the frontend, so use sample or mock data if backend integration is not necessary yet.

**How the output was used:**

The AI guided me through setting up a React project inside my existing Git repository using Vite. It provided step-by-step instructions for installing the necessary packages, organizing the project folders, running the website locally, and preparing the frontend for development.

---

## Prompt 2: UI Development

**AI Tool:** Gemini

**Purpose:** To develop or improve the user interface of BlotTrack.

**Prompt Used:**

You are my frontend development assistant. We are developing a frontend website using React and Vite.

Development rules:

- Use React functional components.

- Use JavaScript, not TypeScript.

- Use CSS in separate files whenever possible.

- Use Lucide React for icons.

- Make the website responsive for desktop, tablet and mobile.

- Follow the Figma design references I provide as closely as possible.

- Reuse components instead of duplicating code.

- Do not unnecessarily modify files or components that are already working.

- Keep the code organized and easy for a beginner to understand.

- Do not implement backend functionality unless I explicitly request it.

- When modifying existing code, provide the complete updated file and tell me its exact filepath.

- Do not invent features that are not included in my design.

We will develop the website one page at a time. Before implementing a new page, examine the existing project structure and reuse its existing styles and components.



**How the output was used:**

The prompt was used to establish clear guidelines for the AI when developing our website's frontend. It ensures that the code follows React best practices, remains organized and responsive, reuses existing components, and closely follows our Figma designs. It also helps prevent unnecessary changes to working files and keeps the development process focused on one page at a time.

**Prompt Used:**

Implement this React page based on my Figma design reference.

**Accuracy is my highest priority. I do not want a redesign or an interpretation of the design. I want the implementation to closely reproduce the original Figma layout.**

Instructions:
- Match the original layout, proportions and positioning as closely as possible.
- Reproduce the spacing, padding, margins and gaps.
- Match font sizes, weights, line heights and font families.
- Match the actual colors, borders, shadows and corner radii.
- Match the width and height of the elements based on the Figma design.
- Do not add, remove or redesign any UI elements.
- Do not substitute the design with your own interpretation.
- Use reusable React components only when they preserve the original design.
- Make the desktop version the primary target if the reference is desktop.
- Do not start coding until you have analyzed the design.

**Before coding:**
1. Identify the page layout and major sections.
2. Identify the component dimensions and spacing.
3. Identify typography and color styles.
4. Identify the necessary reusable components.

After the analysis, implement the page.

If the Figma design data is available, prioritize its actual measurements over visual guesses.

**How the output was used:**

The prompt was used to guide the AI in accurately recreating the webpage based on the Figma design reference. It helped ensure that the layout, spacing, typography, colors, and component dimensions closely matched the original design instead of introducing unnecessary changes or redesigns.

---

## Prompt 4: Troubleshooting and Code Improvements

**AI Tool:** Gemini

**Purpose:** To resolve coding errors or improve existing code.

**Prompt Used:**

Compare the actual website screenshot with the original Figma design.

Identify the visual differences in:
- Layout and positioning
- Widths and heights
- Spacing and padding
- Typography
- Colors
- Borders and shadows

Correct the differences so the actual website more closely matches the Figma design.

Do not redesign the page. Do not modify unrelated components. Do not change parts that are already correct.

Focus only on the visual discrepancies identified from the comparison.

**How the output was used:**

The prompt was used to compare the implemented webpage with the original Figma design and identify visual inconsistencies. It guided the AI in correcting differences in layout, spacing, typography, colors, and element dimensions while preserving the existing design and avoiding unnecessary changes to other components.

---

