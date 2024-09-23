import * as projectEndpoints from './projects'
import *  as userEndpoints from './users'
import * as transactionEndpoints from './transactions'

export const endpoints = {
    projects: { ...projectEndpoints },
    users: { ...userEndpoints },
    transactions: { ...transactionEndpoints }
}