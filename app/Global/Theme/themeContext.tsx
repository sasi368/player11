import React, {createContext} from 'react';

interface Theme {
  theme?: string;
  bottomBar?: string;
  primary?: string;
  background?: string;
  lightGrey2?:string;
  cardBackground?: string;
  text?: string;
  redBg?: string;
  greenBg?: string;
}
const defaultTheme: Theme = {
  // Set default values for other properties
};

const themeContext = createContext<Theme>(defaultTheme);

export default themeContext;
