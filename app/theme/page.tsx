"use client";
import React, { useState, useEffect } from 'react';

// Define the Theme type
type Theme = 
| 'dark'
| 'light'
| 'serika-dark'
| 'serika'
| 'terminal'
| 'nord'
| 'nautilus'
| 'crossword'
| 'matrix'                                              
| 'olive'
| 'strawberry'
| 'retrowave'
| 'laser'
| 'sunset'
| 'mountain'
| 'bushido'
| 'dracula'
| 'zen'
| 'blue-dolphin'
| 'noel'
// New themes
| 'cyberpunk'
| 'forest'
| 'ocean-breeze'
| 'lavender-dream'
| 'arctic'
| 'desert-sunset'
| 'emerald-night'
| 'cosmic'
| 'royal'
| 'autumn-glow';

// Interface for theme configuration
interface ThemeConfig {
  name: string;
  variables: Record<string, string>;
}

// Function to load themes dynamically
const loadThemes = () => {
  const themes: Record<Theme, ThemeConfig> = {
    'dark': {
      name: 'Dark',
      variables: {
        '--background': '0 0% 10%',
        '--foreground': '0 0% 95%',
        '--primary': '0 0% 95%',
        '--primary-foreground': '0 0% 10%',
        '--secondary': '0 0% 20%',
        '--secondary-foreground': '0 0% 95%',
        '--muted': '0 0% 15%',
        '--muted-foreground': '0 0% 70%',
      }
    },
    'light': {
      name: 'Light',
      variables: {
        '--background': '0 0% 100%',
        '--foreground': '0 0% 3.9%',
        '--primary': '0 0% 9%',
        '--primary-foreground': '0 0% 98%',
      }
    },
    'serika-dark': {
      name: 'Serika Dark',
      variables: {
        '--background': '222 47% 11%',
        '--foreground': '220 50% 90%',
        '--primary': '220 50% 90%',
        '--primary-foreground': '222 47% 11%',
      }
    },
    'serika': {
      name: 'Serika',
      variables: {
        '--background': '0 0% 100%',
        '--foreground': '0 0% 3.9%',
      }
    },
    'terminal': {
      name: 'Terminal',
      variables: {
        '--background': '120 10% 10%',
        '--foreground': '120 50% 80%',
      }
    },
    'nord': {
      name: 'Nord',
      variables: {
        '--background': '220 16% 16%',
        '--foreground': '220 16% 90%',
      }
    },
    'nautilus': {
      name: 'Nautilus',
      variables: {
        '--background': '195 53% 28%',
        '--foreground': '195 53% 90%',
      }
    },
    'crossword': {
      name: 'Crossword',
      variables: {
        '--background': '0 0% 20%',
        '--foreground': '0 0% 90%',
      }
    },
    'matrix': {
      name: 'Matrix',
      variables: {
        '--background': '120 39% 12%',
        '--foreground': '120 50% 70%',
      }
    },
    'olive': {
      name: 'Olive',
      variables: {
        '--background': '80 30% 20%',
        '--foreground': '80 30% 90%',
      }
    },
    'strawberry': {
      name: 'Strawberry',
      variables: {
        '--background': '350 60% 30%',
        '--foreground': '350 60% 90%',
      }
    },
    'retrowave': {
      name: 'Retrowave',
      variables: {
        '--background': '300 50% 20%',
        '--foreground': '300 50% 90%',
      }
    },
    'laser': {
      name: 'Laser',
      variables: {
        '--background': '180 50% 20%',
        '--foreground': '180 50% 90%',
      }
    },
    'sunset': {
      name: 'Sunset',
      variables: {
        '--background': '30 50% 30%',
        '--foreground': '30 50% 90%',
      }
    },
    'mountain': {
      name: 'Mountain',
      variables: {
        '--background': '210 30% 20%',
        '--foreground': '210 30% 90%',
      }
    },
    'bushido': {
      name: 'Bushido',
      variables: {
        '--background': '0 0% 15%',
        '--foreground': '0 0% 90%',
      }
    },
    'dracula': {
      name: 'Dracula',
      variables: {
        '--background': '260 40% 20%',
        '--foreground': '260 40% 90%',
      }
    },
    'zen': {
      name: 'Zen',
      variables: {
        '--background': '0 0% 10%',
        '--foreground': '0 0% 90%',
      }
    },
    'blue-dolphin': {
      name: 'Blue Dolphin',
      variables: {
        '--background': '210 50% 30%',
        '--foreground': '210 50% 90%',
      }
    },
    'noel': {
      name: 'Noel',
      variables: {
        '--background': '0 50% 20%',
        '--foreground': '0 50% 90%',
      }
    },
    // New themes
    'cyberpunk': {
      name: 'Cyberpunk',
      variables: {
        '--background': '280 50% 15%',
        '--foreground': '300 100% 70%',
        '--primary': '300 100% 70%',
        '--primary-foreground': '280 50% 15%',
      }
    },
    'forest': {
      name: 'Forest',
      variables: {
        '--background': '120 20% 15%',
        '--foreground': '120 40% 75%',
        '--primary': '120 40% 75%',
        '--primary-foreground': '120 20% 15%',
      }
    },
    'ocean-breeze': {
      name: 'Ocean Breeze',
      variables: {
        '--background': '195 70% 20%',
        '--foreground': '195 70% 85%',
        '--primary': '195 70% 85%',
        '--primary-foreground': '195 70% 20%',
      }
    },
    'lavender-dream': {
      name: 'Lavender Dream',
      variables: {
        '--background': '270 30% 20%',
        '--foreground': '270 50% 85%',
        '--primary': '270 50% 85%',
        '--primary-foreground': '270 30% 20%',
      }
    },
    'arctic': {
      name: 'Arctic',
      variables: {
        '--background': '210 80% 95%',
        '--foreground': '210 80% 10%',
        '--primary': '210 80% 10%',
        '--primary-foreground': '210 80% 95%',
      }
    },
    'desert-sunset': {
      name: 'Desert Sunset',
      variables: {
        '--background': '25 70% 30%',
        '--foreground': '25 70% 90%',
        '--primary': '25 70% 90%',
        '--primary-foreground': '25 70% 30%',
      }
    },
    'emerald-night': {
      name: 'Emerald Night',
      variables: {
        '--background': '160 30% 10%',
        '--foreground': '160 50% 70%',
        '--primary': '160 50% 70%',
        '--primary-foreground': '160 30% 10%',
      }
    },
    'cosmic': {
      name: 'Cosmic',
      variables: {
        '--background': '240 20% 10%',
        '--foreground': '240 50% 80%',
        '--primary': '240 50% 80%',
        '--primary-foreground': '240 20% 10%',
      }
    },
    'royal': {
      name: 'Royal',
      variables: {
        '--background': '260 50% 20%',
        '--foreground': '260 50% 85%',
        '--primary': '260 50% 85%',
        '--primary-foreground': '260 50% 20%',
      }
    },
    'autumn-glow': {
      name: 'Autumn Glow',
      variables: {
        '--background': '30 60% 25%',
        '--foreground': '30 60% 85%',
        '--primary': '30 60% 85%',
        '--primary-foreground': '30 60% 25%',
      }
    },
  };

  return themes;
};

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const themes = loadThemes();

  // Apply theme dynamically
  useEffect(() => {
    if (themes[theme]) {
      const root = document.documentElement;
      const themeConfig = themes[theme];

      // Apply CSS variables
      Object.entries(themeConfig.variables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [theme, themes]);

  // Switch to next theme
  const switchTheme = () => {
    const themeKeys = Object.keys(themes) as Theme[];
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-4">
      <h1 className="text-3xl font-bold mb-6">Theme Switcher</h1>

      {/* Theme Buttons Grid */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {Object.keys(themes).map((themeKey) => (
          <button
            key={themeKey}
            onClick={() => setTheme(themeKey as Theme)}
            className={`
            w-16 h-16 rounded-lg 
            transition-all duration-300 
            ${theme === themeKey ? 'ring-4 ring-primary' : ''}
            hover:scale-105
            `}
            style={{
              backgroundColor: themes[themeKey as Theme].variables['--background'] 
                ? `hsl(${themes[themeKey as Theme].variables['--background']})` 
                : 'gray'
            }}
            title={themes[themeKey as Theme].name}
          />
        ))}
      </div>

      {/* Current Theme Display */}
      <p className="text-lg">
        Current Theme:{' '}
        {themes[theme].name}
      </p>

      {/* Manual Theme Switch Button */}
      <button
        onClick={switchTheme}
        className="
        px-6 py-3 rounded-lg 
        bg-primary text-primary-foreground
        hover:opacity-90
        transition-all duration-300 
        transform hover:scale-105
        "
      >
        Cycle Themes        
      </button>
    </div>
  );
};

export default ThemeSwitcher;       