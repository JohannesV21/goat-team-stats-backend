import clc from "cli-color";

//---- Debug
export const morganDateFormat = "yyyy-MM-DD HH:mm:ss";

export const morganDebugFormat = `[:customDate] - ${clc.cyan(
  ":method"
)} ${clc.yellow(":url")} :status :response-time ms - :res[content-length]]`;

export const consoleTimeFormat = `:date(yyyy-mm-dd HH:MM:ss.l) ${clc.blue(
  ":label"
)}`;
