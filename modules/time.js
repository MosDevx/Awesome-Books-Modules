import { DateTime } from '../node_modules/luxon/src/luxon.js';

// let currentTime = DateTime.now().toJSDate();

export default function getCurrentTime() {
  return DateTime.now().toJSDate();
}