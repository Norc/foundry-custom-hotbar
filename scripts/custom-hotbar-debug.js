const customHotbarDebug = true;

export function CHBDebug(message) {
  if (customHotbarDebug) { 
    console.debug(message);
  }
}