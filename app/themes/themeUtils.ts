import fs from 'fs';
import path from 'path';

// Function to load themes dynamically
export const loadThemes = (): Record<string, { name: string; variables: Record<string, string> }> => {
  const themesPath = path.join(process.cwd(), 'themes');
  const themeFiles = fs.readdirSync(themesPath);

  const themes: Record<string, { name: string; variables: Record<string, string> }> = {};

  themeFiles.forEach((file) => {
    const themeName = file.split('.')[0];
    const themeConfig = require(path.join(themesPath, file));

    themes[themeName] = {
      name: themeConfig.name,
      variables: themeConfig.variables,
    };
  });

  return themes;
};