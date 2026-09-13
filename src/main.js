import { pageTemplate } from './templates/page.js';
import { setupInteractions } from './modules/interactions.js';

document.getElementById('app').innerHTML = pageTemplate;
setupInteractions(document);
