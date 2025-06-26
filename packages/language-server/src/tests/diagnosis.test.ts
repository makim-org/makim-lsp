import { validateDocument } from '../lib/diagnosis';

describe('Makim Diagnosis', () => {
  describe('Schema Validation', () => {
    test('should detect invalid YAML syntax', () => {
      const yaml = `
groups:
  build:
    tasks:
      compile:
        run: npm run build
      invalid: [unclosed array
`;
      const result = validateDocument(yaml);
      expect(result.diagnostics.length).toBeGreaterThan(0);
      expect(result.diagnostics[0].message).toContain('YAML Parse Error');
    });
    test('should validate correct structure', () => {
      const yaml = `
groups:
  build:
    tasks:
      compile:
        run: npm run build
        backend: bash
        hooks:
          pre-run:
            - task: smoke-tests.simple
        log:
          level: err

`;
      const result = validateDocument(yaml);
      expect(result.diagnostics).toHaveLength(0);
      expect(result.parsed).toBeDefined();
    });

    test('should detect missing required groups', () => {
      const yaml = `
env:
  NODE_ENV: development
`;
      const result = validateDocument(yaml);
      expect(result.diagnostics).toHaveLength(1);
      expect(result.diagnostics[0].message).toContain(
        'Missing required property: "groups"',
      );
    });

    test('should detect type error', () => {
      const yaml = `
groups:
  build:
    tasks:
      compile:
        run: 10
`;
      const result = validateDocument(yaml);
      expect(result.diagnostics.length).toBeGreaterThan(0);
      expect(result.diagnostics[0].message).toContain(
        'Type mismatch expected string, got number',
      );
    });
    test('should detect invalid enum', () => {
      const yaml = `
groups:
  build:
    tasks:
      compile:
        log:
          level: er
`;
      const result = validateDocument(yaml);
      expect(result.diagnostics.length).toBeGreaterThan(0);
      expect(result.diagnostics[0].message).toContain(
        'Invalid value: must be one of err, out, both',
      );
    });
    test('should detect invalid additional properties', () => {
      const yaml = `
groups:
  build:
    tasks:
      compile:
        test: 10
`;
      const result = validateDocument(yaml);
      expect(result.diagnostics.length).toBeGreaterThan(0);
      expect(result.diagnostics[0].message).toContain(
        'Unexpected property: "test"',
      );
    });
  });
});
