/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument(
    $filter: ModelSubscriptionDocumentFilterInput
    $owner: String
  ) {
    onCreateDocument(filter: $filter, owner: $owner) {
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
export const onUpdateDocument = /* GraphQL */ `
  subscription OnUpdateDocument(
    $filter: ModelSubscriptionDocumentFilterInput
    $owner: String
  ) {
    onUpdateDocument(filter: $filter, owner: $owner) {
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
export const onDeleteDocument = /* GraphQL */ `
  subscription OnDeleteDocument(
    $filter: ModelSubscriptionDocumentFilterInput
    $owner: String
  ) {
    onDeleteDocument(filter: $filter, owner: $owner) {
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
    $owner: String
  ) {
    onCreateTransaction(filter: $filter, owner: $owner) {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
    $owner: String
  ) {
    onUpdateTransaction(filter: $filter, owner: $owner) {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
    $owner: String
  ) {
    onDeleteTransaction(filter: $filter, owner: $owner) {
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
export const onCreateDocumentLog = /* GraphQL */ `
  subscription OnCreateDocumentLog(
    $filter: ModelSubscriptionDocumentLogFilterInput
    $owner: String
  ) {
    onCreateDocumentLog(filter: $filter, owner: $owner) {
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
export const onUpdateDocumentLog = /* GraphQL */ `
  subscription OnUpdateDocumentLog(
    $filter: ModelSubscriptionDocumentLogFilterInput
    $owner: String
  ) {
    onUpdateDocumentLog(filter: $filter, owner: $owner) {
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
export const onDeleteDocumentLog = /* GraphQL */ `
  subscription OnDeleteDocumentLog(
    $filter: ModelSubscriptionDocumentLogFilterInput
    $owner: String
  ) {
    onDeleteDocumentLog(filter: $filter, owner: $owner) {
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
