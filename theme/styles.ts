import { Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: () => ({
    html: {
      scrollBehavior: "smooth",
      body: {
        // Fix height on iOS when status bar is collapse
        // '.chakra-modal__content-container': {
        //   height: '100%',
        // },
        // fontFeatureSettings: "'ss01' on, 'ss04' on, 'salt' on, 'titl' on",
        bgColor: "#fff",
        color: "#fff",
        // h1: {
        //   fontSize: ['5xl', '6xl', null, '7xl'],
        //   lineHeight: ['shorter'],
        // },
        // h2: {
        //   fontSize: ['4xl', null, '5xl'],
        //   lineHeight: ['shorter'],
        // },
        // h3: {
        //   fontSize: ['3xl', null, '4xl'],
        //   lineHeight: ['shorter'],
        // },
        // h4: {
        //   fontSize: ['2xl', null, '3xl'],
        //   lineHeight: ['shorter'],
        // },
      },
    },
  }),
};

export default styles;
