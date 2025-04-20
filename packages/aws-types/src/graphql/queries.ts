/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getDocument = /* GraphQL */ `query GetDocument($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetDocumentQueryVariables,
  APITypes.GetDocumentQuery
>;
export const listDocuments = /* GraphQL */ `query ListDocuments(
  $filter: ModelDocumentFilterInput
  $limit: Int
  $nextToken: String
) {
  listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDocumentsQueryVariables,
  APITypes.ListDocumentsQuery
>;
export const getTransaction = /* GraphQL */ `query GetTransaction($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetTransactionQueryVariables,
  APITypes.GetTransactionQuery
>;
export const listTransactions = /* GraphQL */ `query ListTransactions(
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
      createdAt
      updatedAt
      documentTransactionsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTransactionsQueryVariables,
  APITypes.ListTransactionsQuery
>;
export const getDocumentLog = /* GraphQL */ `query GetDocumentLog($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetDocumentLogQueryVariables,
  APITypes.GetDocumentLogQuery
>;
export const listDocumentLogs = /* GraphQL */ `query ListDocumentLogs(
  $filter: ModelDocumentLogFilterInput
  $limit: Int
  $nextToken: String
) {
  listDocumentLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      createdAt
      updatedAt
      documentLogId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDocumentLogsQueryVariables,
  APITypes.ListDocumentLogsQuery
>;
