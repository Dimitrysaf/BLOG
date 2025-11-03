// src/codex.js

// Εδώ κάνουμε import όλα τα components του Codex που χρησιμοποιούμε.
import {
  CdxButton,
  CdxButtonGroup,
  CdxCard,
  CdxDialog,
  CdxField,
  CdxIcon,
  CdxImage,
  CdxMessage,
  CdxMenuItem,
  CdxProgressBar,
  CdxProgressIndicator,
  CdxTable,
  CdxTabs,
  CdxTab,
  CdxTextArea,
  CdxTextInput,
  CdxThumbnail,
  CdxToggleButton
} from '@wikimedia/codex';

// Αυτή η συνάρτηση "εγκαθιστά" τα components στην Vue εφαρμογή σου.
export function installCodex( app ) {
  app.component( 'CdxButton', CdxButton );
  app.component( 'CdxButtonGroup', CdxButtonGroup );
  app.component( 'CdxCard', CdxCard );
  app.component( 'CdxDialog', CdxDialog );
  app.component( 'CdxField', CdxField );
  app.component( 'CdxIcon', CdxIcon );
  app.component( 'CdxImage', CdxImage );
  app.component( 'CdxMessage', CdxMessage );
  app.component( 'CdxMenuItem', CdxMenuItem );
  app.component( 'CdxProgressBar', CdxProgressBar );
  app.component( 'CdxProgressIndicator', CdxProgressIndicator );
  app.component( 'CdxTable', CdxTable );
  app.component( 'CdxTabs', CdxTabs );
  app.component( 'CdxTab', CdxTab );
  app.component( 'CdxTextArea', CdxTextArea );
  app.component( 'CdxTextInput', CdxTextInput );
  app.component( 'CdxThumbnail', CdxThumbnail );
  app.component( 'CdxToggleButton', CdxToggleButton );
}
