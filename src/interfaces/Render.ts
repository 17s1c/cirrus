export interface Render {
  render(templatePath: string, data?: any): Promise<string>;
}

export const Render = Symbol.for('Render');
