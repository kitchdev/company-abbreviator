import { promises as fs } from "fs"
import companies from "../../companies.json"

interface Company {
  name: string
  abbreviated_code: string
}

function nextChar(c: string): string {
  const nextCode = c.charCodeAt(0) + 1
  console.log(nextCode)
  return String.fromCharCode(nextCode > 90 ? 65 : nextCode)
}

const codesInUse = companies
  .filter(({ abbreviated_code }) => abbreviated_code.length > 0)
  .map(({ abbreviated_code }) => abbreviated_code)

// Talk other ways of doing this, potentially overkill,
// take first characters, shift right, append random character...
function threeLetterPermutations(string: string): string[] {
  if (string.length < 2) return string // This is our break condition
  let permutations = [] // This array will hold our permutations
  for (let i = 0; i < string.length; i++) {
    let char = string[i]
    let remainingString =
      string.slice(0, i) + string.slice(i + 1, string.length)
    for (let subPermutation of threeLetterPermutations(remainingString)) {
      const abbreviation = (char + subPermutation).slice(0, 3)
      permutations.push(abbreviation)
    }
  }
  return Array.from(new Set(permutations))
}

// need to take a company name and create a unique company code if one does not exist
const createAbrv = async (): Company[] => {
  const companyJson = companies.map(({ name, abbreviated_code }) => {
    let companyCode = abbreviated_code

    const compressedName = name
        .replace(/[^a-zA-Z]/gi, "") // remove spaces and special ,haracters
        .toUpperCase()
      
    // before we start heavy process to create permutations, check if first 3 chars will work
    let firstTryCode = compressedName.slice(0, 3)
    if (codesInUse.indexOf(firstTryCode) === -1) {
      companyCode = firstTryCode
      codesInUse.push(companyCode)
    }

    if (!companyCode) {
      // Finding all possible permutations for the first 6 chars of company name. 
      // Slicing cause otherwise way too may permutations runs for very long time.
      const codeArr = threeLetterPermutations(compressedName.slice(0, 6)) 
      codeArr.some((code) => {
        if (codesInUse.indexOf(code) >= 0) {
          return false
        }
        companyCode = code
        codesInUse.push(companyCode)
        return true
      })


      // If no permutations match were naively checking to see if updating the last character of each permut will give us an available code 
      // and if all else fails we throw an error...
      if (!companyCode) {
        const codeFound = codeArr.some((code) => {
          let lastChar = code.charAt(2)
          let codeToTry = code.slice(0, 2) + nextChar(lastChar)

          if (codesInUse.indexOf(codeToTry) < 0) {
            companyCode = codeToTry
            codesInUse.push(companyCode)
            return true
          } 
        });

        if(!codeFound) {
          throw Error(`Code not found for company ${name}`)
        }
      }
    }

    return {
      name,
      abbreviated_code: companyCode,
    }
  })

  await fs.writeFile("companies.json", JSON.stringify(companyJson, null, 2))
  return companyJson
}

createAbrv()
