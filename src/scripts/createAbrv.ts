import { promises as fs } from "fs";
import companies from "../../companies.json";

interface Company {
  name: string;
  abbreviated_code: string;
}

const codesInUse = companies
  .filter(({ abbreviated_code }) => abbreviated_code.length > 0)
  .map(({ abbreviated_code }) => abbreviated_code);

// Talk other ways of doing this, potentially overkill,
// take first characters, shift right, append random character...
function threeLetterPermutations(string: string): string[] {
  if (string.length < 2) return string; // This is our break condition
  let permutations = []; // This array will hold our permutations
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    let remainingString =
      string.slice(0, i) + string.slice(i + 1, string.length);
    for (let subPermutation of threeLetterPermutations(remainingString)) {
      const abbreviation = (char + subPermutation).slice(0, 3);
      permutations.push(abbreviation);
    }
  }
  return Array.from(new Set(permutations));
}

// need to take a company name and create a unique company code if one does not exist
const createAbrv = async (): Company[] => {
  const companyJson = companies.map(({ name, abbreviated_code }) => {
    let companyCode = abbreviated_code;

    if (!companyCode) {
      const compressedName = name
        .replace(/[^0-9a-zA-Z]/gi, "") // remove spaces and special ,haracters
        .toUpperCase()
        .slice(0, 6); // Slicing cause otherwise way too may permutations runs for very long time
      
      const codeArr = threeLetterPermutations(compressedName);

      codeArr.some((code) => {
        if (codesInUse.indexOf(code) >= 0) {
          return false;
        }
        companyCode = code;
        codesInUse.push(companyCode);
        return true;
      });
    }

    return {
      name,
      abbreviated_code: companyCode,
    };
  });

  await fs.writeFile("companies.json", JSON.stringify(companyJson, null, 2));
  return companyJson;
};

createAbrv();
