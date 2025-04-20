/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateDocument = /* GraphQL */ `subscription OnCreateDocument(
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
` as GeneratedSubscription<
  APITypes.OnCreateDocumentSubscriptionVariables,
  APITypes.OnCreateDocumentSubscription
>;
export const onUpdateDocument = /* GraphQL */ `subscription OnUpdateDocument(
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
` as GeneratedSubscription<
  APITypes.OnUpdateDocumentSubscriptionVariables,
  APITypes.OnUpdateDocumentSubscription
>;
export const onDeleteDocument = /* GraphQL */ `subscription OnDeleteDocument(
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
` as GeneratedSubscription<
  APITypes.OnDeleteDocumentSubscriptionVariables,
  APITypes.OnDeleteDocumentSubscription
>;
export const onCreateTransaction = /* GraphQL */ `subscription OnCreateTransaction(
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
` as GeneratedSubscription<
  APITypes.OnCreateTransactionSubscriptionVariables,
  APITypes.OnCreateTransactionSubscription
>;
export const onUpdateTransaction = /* GraphQL */ `subscription OnUpdateTransaction(
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
` as GeneratedSubscription<
  APITypes.OnUpdateTransactionSubscriptionVariables,
  APITypes.OnUpdateTransactionSubscription
>;
export const onDeleteTransaction = /* GraphQL */ `subscription OnDeleteTransaction(
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
` as GeneratedSubscription<
  APITypes.OnDeleteTransactionSubscriptionVariables,
  APITypes.OnDeleteTransactionSubscription
>;
export const onCreateDocumentLog = /* GraphQL */ `subscription OnCreateDocumentLog(
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
` as GeneratedSubscription<
  APITypes.OnCreateDocumentLogSubscriptionVariables,
  APITypes.OnCreateDocumentLogSubscription
>;
export const onUpdateDocumentLog = /* GraphQL */ `subscription OnUpdateDocumentLog(
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
` as GeneratedSubscription<
  APITypes.OnUpdateDocumentLogSubscriptionVariables,
  APITypes.OnUpdateDocumentLogSubscription
>;
export const onDeleteDocumentLog = /* GraphQL */ `subscription OnDeleteDocumentLog(
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
` as GeneratedSubscription<
  APITypes.OnDeleteDocumentLogSubscriptionVariables,
  APITypes.OnDeleteDocumentLogSubscription
>;
