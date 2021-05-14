import { Request, Response } from "express"
import { promises as fs } from "fs"

import companies from "../../companies.json"

interface Company {
  name: string
  abbreviated_code: string
}

const companyNameList = companies.map((company) => company.name)
const companyCodeList = companies.map((company) => company.abbreviated_code)

export const createCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Do some validation on request body
  const newCompany: Company = req.body.company
  console.log(newCompany.name.length)
  if (!newCompany.name || newCompany.name.length < 3) {
    res.status(422).send({
      status: "failure",
      message: "You must provide a company name, and it must be at least 3 characters long",
    })
    return
  }
  // check if new company doesn't already exist
  try {
    const compNameExists = companyNameList.find(
      (name) => name === newCompany.name
    )
    const compAbrExists = companyCodeList.find(
      (code) => code === newCompany.abbreviated_code
    )

    if (compNameExists || compAbrExists) {
      res.status(422).send({
        status: "failure",
        message: "This company name or abbreviated code already exists",
      })
      return
    }
    // mutate existing company and overwrite our data file
    companies.push(newCompany)
    await fs.writeFile("companies.json", JSON.stringify(companies, null, 2))
    res.status(200).send(companies)
  } catch (err: unknown) {
    console.error(err)
    res.status(500).send({
      status: "failure",
      message: "an Error occured while trying to insert company",
    })
  }
}
