# General

- Sort imports alphabetically.
- Use ~ to import from the `application` folder. E.g., `import { MyComponent } from '~/components'`.
- Use lambda functions instead of function expressions. E.g., use `const MyComponent: FC = () => { ... }` instead of `function MyComponent() { ... }`.
- Do not use the `React` namespace to reference React types. E.g., use `FC` instead of `React.FC`.
- Sort props and class members alphabetically.

# UI components

- Each component is contained in a single file.
- Folders with multiple related components (e.g., `table.tsx`, `table-header.tsx`, `table-footer.tsx`, etc.) should
  - be named after the main component (i.e., `table`).
  - have an `index.ts` file exporting all global components.
