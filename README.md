# Create a 3-Letter Company Abbreviation System

#### Description

Our finance team wants us to create unique 3-Letter abbreviated "codes" for all of the companies in our database so that they can identify them more easily in their spreadsheets.

#### Requirements

- Must be unique codes
- Always 3 letters, uppercase
- No special characters, spaces, numbers.
- Every company needs a code, and ideally this function scales into the future!

#### Test Instructions

Using `npm`, install and setup a basic Express server which exposes an endpoint of `/create-company`. We should be able to use this endpoint to add companies to the `companies.json` data file.

As well, their should be a script in the `package.json` that iterates through `companies.json` and adds unique abbreviations for any company that doesn't have one yet.

#### Definition of Done

- `/create-company` endpoint that allows adding a company to `companies.json` (with name and abbreviated_code)

- script in `package.json` that loops through all companies and ensures unique 3 letter codes for all.


Don't worry about fancy Express boilerplate or any excess tooling optimizations, just focus on the basics of clean implementation. Send us back the project in a zip so we can try it out when you're done!