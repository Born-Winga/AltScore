/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
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
export const updateDocument = /* GraphQL */ `
  mutation UpdateDocument(
    $input: UpdateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    updateDocument(input: $input, condition: $condition) {
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
export const deleteDocument = /* GraphQL */ `
  mutation DeleteDocument(
    $input: DeleteDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    deleteDocument(input: $input, condition: $condition) {
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
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
export const createDocumentLog = /* GraphQL */ `
  mutation CreateDocumentLog(
    $input: CreateDocumentLogInput!
    $condition: ModelDocumentLogConditionInput
  ) {
    createDocumentLog(input: $input, condition: $condition) {
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
export const updateDocumentLog = /* GraphQL */ `
  mutation UpdateDocumentLog(
    $input: UpdateDocumentLogInput!
    $condition: ModelDocumentLogConditionInput
  ) {
    updateDocumentLog(input: $input, condition: $condition) {
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
export const deleteDocumentLog = /* GraphQL */ `
  mutation DeleteDocumentLog(
    $input: DeleteDocumentLogInput!
    $condition: ModelDocumentLogConditionInput
  ) {
    deleteDocumentLog(input: $input, condition: $condition) {
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
