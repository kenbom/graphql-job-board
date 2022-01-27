const db = require('./db')

const Query = {
    company: (root, args) => db.companies.get(args.id),
    job: (root, args) => db.jobs.get(args.id),
    jobs: (args) => db.jobs.list()
}

const Mutation = {
    createJob: (root, {companyId, title, description}) => {
        const id = db.jobs.create({companyId, title, description})
        return db.jobs.get(id)
    }
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
}

const Company = {
    jobs: (company) => db.jobs.list()
    .filter((job) => job.companyId === company.id)
}

module.exports = { Query, Job, Company, Mutation}