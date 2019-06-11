/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import React from 'react';
import { TextProvider } from './src/context/TextContext';

export const wrapRootElement = ({ element }) => <TextProvider>{element}</TextProvider>;
