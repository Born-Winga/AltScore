/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      createdAt
      updatedAt
      apiKey
      status
      deleted
      documents {
        nextToken
      }
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        createdAt
        updatedAt
        apiKey
        status
        deleted
        owner
      }
      nextToken
    }
  }
`;
export const getDocument = /* GraphQL */ `
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      type
      name
      issuer
      password
      userId
      user {
        id
        name
        email
        createdAt
        updatedAt
        apiKey
        status
        deleted
        owner
      }
      status
      expiryDate
      createdAt
      updatedAt
      summary
      hash
      shortId
      url
      transactions {
        nextToken
      }
      log {
        nextToken
      }
      userDocumentsId
      owner
    }
  }
`;
export const listDocuments = /* GraphQL */ `
  query ListDocuments(
    $limit: Int
    $nextToken: String
  ) {
    listDocuments(limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        name
        issuer
        password
        userId
        status
        expiryDate
        createdAt
        updatedAt
        summary
        hash
        shortId
        url
        owner
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      type
      description
      amount
      details
      documentId
      document {
        id
        type
        name
        issuer
        password
        userId
        status
        expiryDate
        createdAt
        updatedAt
        summary
        hash
        shortId
        url
        userDocumentsId
        owner
      }
      createdAt
      updatedAt
      documentTransactionsId
      owner
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        description
        amount
        details
        documentId
        createdAt
        updatedAt
        documentTransactionsId
        owner
      }
      nextToken
    }
  }
`;
export const getDocumentLog = /* GraphQL */ `
  query GetDocumentLog($id: ID!) {
    getDocumentLog(id: $id) {
      id
      documentId
      document {
        id
        type
        name
        issuer
        password
        userId
        status
        expiryDate
        createdAt
        updatedAt
        summary
        hash
        shortId
        url
        userDocumentsId
        owner
      }
      createdAt
      updatedAt
      documentLogId
      owner
    }
  }
`;
export const listDocumentLogs = /* GraphQL */ `
  query ListDocumentLogs(
    $filter: ModelDocumentLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocumentLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        documentId
        createdAt
        updatedAt
        documentLogId
        owner
      }
      nextToken
    }
  }
`;
