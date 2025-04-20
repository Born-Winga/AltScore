/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
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
      items {
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
          __typename
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
          __typename
        }
        log {
          nextToken
          __typename
        }
        userDocumentsId
        owner
        __typename
      }
      nextToken
      __typename
    }
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
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
      items {
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
          __typename
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
          __typename
        }
        log {
          nextToken
          __typename
        }
        userDocumentsId
        owner
        __typename
      }
      nextToken
      __typename
    }
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
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
      items {
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
          __typename
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
          __typename
        }
        log {
          nextToken
          __typename
        }
        userDocumentsId
        owner
        __typename
      }
      nextToken
      __typename
    }
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createDocument = /* GraphQL */ `mutation CreateDocument(
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
      documents {
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
          userDocumentsId
          owner
          __typename
        }
        nextToken
        __typename
      }
      owner
      __typename
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
      items {
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
          __typename
        }
        createdAt
        updatedAt
        documentTransactionsId
        owner
        __typename
      }
      nextToken
      __typename
    }
    log {
      items {
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
          __typename
        }
        createdAt
        updatedAt
        documentLogId
        owner
        __typename
      }
      nextToken
      __typename
    }
    userDocumentsId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDocumentMutationVariables,
  APITypes.CreateDocumentMutation
>;
export const updateDocument = /* GraphQL */ `mutation UpdateDocument(
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
      documents {
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
          userDocumentsId
          owner
          __typename
        }
        nextToken
        __typename
      }
      owner
      __typename
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
      items {
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
          __typename
        }
        createdAt
        updatedAt
        documentTransactionsId
        owner
        __typename
      }
      nextToken
      __typename
    }
    log {
      items {
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
          __typename
        }
        createdAt
        updatedAt
        documentLogId
        owner
        __typename
      }
      nextToken
      __typename
    }
    userDocumentsId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDocumentMutationVariables,
  APITypes.UpdateDocumentMutation
>;
export const deleteDocument = /* GraphQL */ `mutation DeleteDocument(
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
      documents {
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
          userDocumentsId
          owner
          __typename
        }
        nextToken
        __typename
      }
      owner
      __typename
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
      items {
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
          __typename
        }
        createdAt
        updatedAt
        documentTransactionsId
        owner
        __typename
      }
      nextToken
      __typename
    }
    log {
      items {
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
          __typename
        }
        createdAt
        updatedAt
        documentLogId
        owner
        __typename
      }
      nextToken
      __typename
    }
    userDocumentsId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDocumentMutationVariables,
  APITypes.DeleteDocumentMutation
>;
export const createTransaction = /* GraphQL */ `mutation CreateTransaction(
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
      user {
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
          __typename
        }
        owner
        __typename
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
          __typename
        }
        nextToken
        __typename
      }
      log {
        items {
          id
          documentId
          createdAt
          updatedAt
          documentLogId
          owner
          __typename
        }
        nextToken
        __typename
      }
      userDocumentsId
      owner
      __typename
    }
    createdAt
    updatedAt
    documentTransactionsId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTransactionMutationVariables,
  APITypes.CreateTransactionMutation
>;
export const updateTransaction = /* GraphQL */ `mutation UpdateTransaction(
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
      user {
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
          __typename
        }
        owner
        __typename
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
          __typename
        }
        nextToken
        __typename
      }
      log {
        items {
          id
          documentId
          createdAt
          updatedAt
          documentLogId
          owner
          __typename
        }
        nextToken
        __typename
      }
      userDocumentsId
      owner
      __typename
    }
    createdAt
    updatedAt
    documentTransactionsId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTransactionMutationVariables,
  APITypes.UpdateTransactionMutation
>;
export const deleteTransaction = /* GraphQL */ `mutation DeleteTransaction(
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
      user {
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
          __typename
        }
        owner
        __typename
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
          __typename
        }
        nextToken
        __typename
      }
      log {
        items {
          id
          documentId
          createdAt
          updatedAt
          documentLogId
          owner
          __typename
        }
        nextToken
        __typename
      }
      userDocumentsId
      owner
      __typename
    }
    createdAt
    updatedAt
    documentTransactionsId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTransactionMutationVariables,
  APITypes.DeleteTransactionMutation
>;
export const createDocumentLog = /* GraphQL */ `mutation CreateDocumentLog(
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
      user {
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
          __typename
        }
        owner
        __typename
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
          __typename
        }
        nextToken
        __typename
      }
      log {
        items {
          id
          documentId
          createdAt
          updatedAt
          documentLogId
          owner
          __typename
        }
        nextToken
        __typename
      }
      userDocumentsId
      owner
      __typename
    }
    createdAt
    updatedAt
    documentLogId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDocumentLogMutationVariables,
  APITypes.CreateDocumentLogMutation
>;
export const updateDocumentLog = /* GraphQL */ `mutation UpdateDocumentLog(
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
      user {
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
          __typename
        }
        owner
        __typename
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
          __typename
        }
        nextToken
        __typename
      }
      log {
        items {
          id
          documentId
          createdAt
          updatedAt
          documentLogId
          owner
          __typename
        }
        nextToken
        __typename
      }
      userDocumentsId
      owner
      __typename
    }
    createdAt
    updatedAt
    documentLogId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDocumentLogMutationVariables,
  APITypes.UpdateDocumentLogMutation
>;
export const deleteDocumentLog = /* GraphQL */ `mutation DeleteDocumentLog(
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
      user {
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
          __typename
        }
        owner
        __typename
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
          __typename
        }
        nextToken
        __typename
      }
      log {
        items {
          id
          documentId
          createdAt
          updatedAt
          documentLogId
          owner
          __typename
        }
        nextToken
        __typename
      }
      userDocumentsId
      owner
      __typename
    }
    createdAt
    updatedAt
    documentLogId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDocumentLogMutationVariables,
  APITypes.DeleteDocumentLogMutation
>;
