const customHotbarDebug = false;

export function CHBDebug(message) {
  if (customHotbarDebug) { 
    console.debug(message);
  }
}
