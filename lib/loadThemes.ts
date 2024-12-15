import fs from 'fs';
import path from 'path';

export const loadThemes = (): Record<string, any> => {
  const themesDir = path.join(process.cwd(), 'themes');
  const themeFiles = fs.readdirSync(themesDir);

  const themes: Record<string, any> = {};

  themeFiles.forEach((file) => {
    const themeName = file.split('.')[0];
    const themeConfigPath = path.join(themesDir, file);
    const themeConfig = JSON.parse(fs.readFileSync(themeConfigPath, 'utf-8'));
    themes[themeName] = themeConfig;
  });

  return themes;
};
