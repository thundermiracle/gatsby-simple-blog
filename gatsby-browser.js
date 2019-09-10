/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import React from 'react';
import { LanguageProvider } from './src/context/LanguageContext';

export const wrapRootElement = ({ element }) => <LanguageProvider>{element}</LanguageProvider>;
