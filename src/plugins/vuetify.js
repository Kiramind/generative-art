import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import {
  mdiArrangeSendBackward,
  mdiBorderOutside,
  mdiContentCopy,
  mdiFormatColorFill,
  mdiFormatLineStyle,
  mdiInvertColors,
  mdiLockPattern,
  mdiMapMarkerPath,
  mdiPageNext,
  mdiPalette,
  mdiPuzzle,
  mdiShape,
} from '@mdi/js'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      arrangeSendBackward: mdiArrangeSendBackward,
      borderOutside: mdiBorderOutside,
      contentCopy: mdiContentCopy,
      formatColorFill: mdiFormatColorFill,
      formatLineStyle: mdiFormatLineStyle,
      invertColors: mdiInvertColors,
      lockPattern: mdiLockPattern,
      mapMarkerPath: mdiMapMarkerPath,
      pageNext: mdiPageNext,
      palette: mdiPalette,
      puzzle: mdiPuzzle,
      shape: mdiShape,
    },
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1976D2',
        },
      },
    },
  },
})
