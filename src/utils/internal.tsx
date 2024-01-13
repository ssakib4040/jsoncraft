import utils from "../utils";

export function processForeachString(json: unknown[]): string {
  const regex = /{{for\((\d+)\)}}/g;
  const matches = json.toString().match(regex);

  if (!matches) return JSON.stringify(json);

  const matchedNumber = matches[0]?.match(/\d+/g)?.[0];

  const parsedNumber = parseInt(matchedNumber as string);

  json.shift();

  const newJson: unknown[] = [];

  for (let i = 0; i < parsedNumber; i++) {
    json.forEach((element) => {
      newJson.push(element);
    });
  }

  return JSON.stringify(newJson);
}

export function processTemplateString(jsonString: string): string {
  const regex = /{{(\w+)\(\)}}/g;
  const matches = jsonString.toString().match(regex);

  if (!matches) return jsonString;

  const data = jsonString.replace(regex, (match, functionName) => {
    // @ts-expect-error intentionally using bracket notation
    if (utils[functionName] && typeof utils[functionName] === "function") {
      // @ts-expect-error intentionally using bracket notation
      return utils[functionName]();
    }
    return match; // Return placeholder if function doesn't exist in utils
  });

  return data;
}

export function isValidJson(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
  } catch (error) {
    return false;
  }
  return true;
}
