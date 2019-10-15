export const constructDetails = currentPalette => {
  return {
    project_name: currentPalette.project_name,
    palette: currentPalette.palette,
    hex_1: currentPalette.colors[0].hex_1,
    hex_2: currentPalette.colors[1].hex_2,
    hex_3: currentPalette.colors[2].hex_3,
    hex_4: currentPalette.colors[3].hex_4,
    hex_5: currentPalette.colors[4].hex_5
  }
};

export const generateHex = (string = "#") => {
  const hexadecimals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  const index = Math.floor(Math.random() * 16);
  if (string.length === 7) {
    return string;
  } else {
    return generateHex(string + hexadecimals[index]);
  }
};

export const lockColors = (colors, position) => {
  return colors.map((color, i) => {
    if (i === position) {
      color.locked = !color.locked;
      return color;
    } else {
      return color;
    }
  });
}

export const mapLockedColors = colors => {
  return colors.map((color, i) => {
    if (!color.locked) {
      color[`hex_${i + 1}`] = generateHex();
      return color;
    } else {
      return color;
    }
  });
}

export const reconstructColors = palette => {
  return [
    { hex_1: palette.hex_1 },
    { hex_2: palette.hex_2 },
    { hex_3: palette.hex_3 },
    { hex_4: palette.hex_4 },
    { hex_5: palette.hex_5 }
  ];
}

export const cleanResults = array => {
  return array.map(obj => {
    delete obj.created_at;
    delete obj.updated_at;
    return obj;
  });
}