import { ThemeComponents } from '@chakra-ui/react'

const Input: ThemeComponents['Input'] = {
  baseStyle: {},
  variants: {
    primary: {
      field: {
        borderRadius: 'sm',
        bg: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        py: 6,
        _invalid: {
          borderColor: 'red.400',
        },
        _placeholder: {
          color: 'gray.300',
        },
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
}

export default Input
