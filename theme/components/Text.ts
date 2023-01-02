import { ThemeComponents } from '@chakra-ui/react'

const Text: ThemeComponents['Text'] = {
  baseStyle: {},
  sizes: {
    xs: {
      fontSize: ['xs', null, 'sm', null, 'md'],
    },
    sm: {
      fontSize: ['sm', null, 'md', null, 'lg'],
    },
    md: {
      fontSize: ['md', null, 'lg', null, 'xl'],
    },
    lg: {
      fontSize: ['lg', null, 'xl', null, '2xl'],
    },
    xl: {
      fontSize: ['xl', null, '2xl', null, '3xl'],
    },
    '2xl': {
      fontSize: ['2xl', null, '3xl', null, '4xl'],
    },
    '3xl': {
      fontSize: ['3xl', null, '4xl', null, '5xl'],
    },
    '4xl': {
      fontSize: ['4xl', null, '5xl', null, '6xl'],
    },
    '5xl': {
      fontSize: ['5xl', null, '6xl', null, '7xl'],
    },
    '6xl': {
      fontSize: ['6xl', null, '7xl', null, '8xl'],
    },
    '7xl': {
      fontSize: ['7xl', null, '8xl', null, '9xl'],
    },
    '8xl':{
      fontSize: ['8xl', null, '9xl', null, null],
    },
    '9xl':{
      fontSize: ['9xl', null, null, null, null],
    }
  },
}

export default Text
