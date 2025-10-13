// src/codex.js

// Εδώ κάνουμε import όλα τα components του Codex που χρησιμοποιούμε.
import {
  CdxButton,
  CdxButtonGroup,
  CdxCard,
  CdxField,
  CdxIcon,
  CdxMessage,
  CdxProgressBar,
  CdxProgressIndicator,
  CdxTextArea,
  CdxTextInput 
} from '@wikimedia/codex';

// Αυτή η συνάρτηση "εγκαθιστά" τα components στην Vue εφαρμογή σου.
export function installCodex( app ) {
  app.component( 'CdxButton', CdxButton );
  app.component( 'CdxButtonGroup', CdxButtonGroup ); 
  app.component( 'CdxCard', CdxCard );
  app.component( 'CdxField', CdxField );
  app.component( 'CdxIcon', CdxIcon );
  app.component( 'CdxMessage', CdxMessage );
  app.component( 'CdxProgressBar', CdxProgressBar );
  app.component( 'CdxProgressIndicator', CdxProgressIndicator );
  app.component( 'CdxTextArea', CdxTextArea );
  app.component( 'CdxTextInput', CdxTextInput ); 
}