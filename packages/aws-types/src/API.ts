/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name: string,
  email: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  apiKey: string,
  status: string,
  deleted: boolean,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apiKey?: ModelStringInput | null,
  status?: ModelStringInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  owner?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  email: string,
  createdAt: string,
  updatedAt: string,
  apiKey: string,
  status: string,
  deleted: boolean,
  documents?: ModelDocumentConnection | null,
  owner?: string | null,
};

export type ModelDocumentConnection = {
  __typename: "ModelDocumentConnection",
  items:  Array<Document | null >,
  nextToken?: string | null,
};

export type Document = {
  __typename: "Document",
  id: string,
  type: string,
  name: string,
  issuer: string,
  password?: string | null,
  userId: string,
  user?: User | null,
  status?: DocStatus | null,
  expiryDate?: string | null,
  createdAt: string,
  updatedAt: string,
  summary?: string | null,
  hash?: string | null,
  shortId: string,
  url: string,
  transactions?: ModelTransactionConnection | null,
  log?: ModelDocumentLogConnection | null,
  userDocumentsId?: string | null,
  owner?: string | null,
};

export enum DocStatus {
  PROCESSING = "PROCESSING",
  REJECTED = "REJECTED",
  PROCESSED = "PROCESSED",
  SUBMITTED = "SUBMITTED",
}


export type ModelTransactionConnection = {
  __typename: "ModelTransactionConnection",
  items:  Array<Transaction | null >,
  nextToken?: string | null,
};

export type Transaction = {
  __typename: "Transaction",
  id: string,
  type?: TransactionType | null,
  description?: TransactionDescription | null,
  amount?: number | null,
  details?: string | null,
  documentId?: string | null,
  document?: Document | null,
  createdAt: string,
  updatedAt: string,
  documentTransactionsId?: string | null,
  owner?: string | null,
};

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}


export enum TransactionDescription {
  OVERDRAFT = "OVERDRAFT",
  LOAN = "LOAN",
  DEPOSIT = "DEPOSIT",
  PAYMENT = "PAYMENT",
  SAVING = "SAVING",
}


export type ModelDocumentLogConnection = {
  __typename: "ModelDocumentLogConnection",
  items:  Array<DocumentLog | null >,
  nextToken?: string | null,
};

export type DocumentLog = {
  __typename: "DocumentLog",
  id: string,
  documentId: string,
  document?: Document | null,
  createdAt: string,
  updatedAt: string,
  documentLogId?: string | null,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  apiKey?: string | null,
  status?: string | null,
  deleted?: boolean | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateDocumentInput = {
  id?: string | null,
  type: string,
  name: string,
  issuer: string,
  password?: string | null,
  userId: string,
  status?: DocStatus | null,
  expiryDate?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  summary?: string | null,
  hash?: string | null,
  shortId: string,
  url: string,
  userDocumentsId?: string | null,
};

export type ModelDocumentConditionInput = {
  type?: ModelStringInput | null,
  name?: ModelStringInput | null,
  issuer?: ModelStringInput | null,
  password?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  status?: ModelDocStatusInput | null,
  expiryDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  hash?: ModelStringInput | null,
  shortId?: ModelStringInput | null,
  url?: ModelStringInput | null,
  and?: Array< ModelDocumentConditionInput | null > | null,
  or?: Array< ModelDocumentConditionInput | null > | null,
  not?: ModelDocumentConditionInput | null,
  userDocumentsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelDocStatusInput = {
  eq?: DocStatus | null,
  ne?: DocStatus | null,
};

export type UpdateDocumentInput = {
  id: string,
  type?: string | null,
  name?: string | null,
  issuer?: string | null,
  password?: string | null,
  userId?: string | null,
  status?: DocStatus | null,
  expiryDate?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  summary?: string | null,
  hash?: string | null,
  shortId?: string | null,
  url?: string | null,
  userDocumentsId?: string | null,
};

export type DeleteDocumentInput = {
  id: string,
};

export type CreateTransactionInput = {
  id?: string | null,
  type?: TransactionType | null,
  description?: TransactionDescription | null,
  amount?: number | null,
  details?: string | null,
  documentId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  documentTransactionsId?: string | null,
};

export type ModelTransactionConditionInput = {
  type?: ModelTransactionTypeInput | null,
  description?: ModelTransactionDescriptionInput | null,
  amount?: ModelFloatInput | null,
  details?: ModelStringInput | null,
  documentId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTransactionConditionInput | null > | null,
  or?: Array< ModelTransactionConditionInput | null > | null,
  not?: ModelTransactionConditionInput | null,
  documentTransactionsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelTransactionTypeInput = {
  eq?: TransactionType | null,
  ne?: TransactionType | null,
};

export type ModelTransactionDescriptionInput = {
  eq?: TransactionDescription | null,
  ne?: TransactionDescription | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateTransactionInput = {
  id: string,
  type?: TransactionType | null,
  description?: TransactionDescription | null,
  amount?: number | null,
  details?: string | null,
  documentId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  documentTransactionsId?: string | null,
};

export type DeleteTransactionInput = {
  id: string,
};

export type CreateDocumentLogInput = {
  id?: string | null,
  documentId: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  documentLogId?: string | null,
};

export type ModelDocumentLogConditionInput = {
  documentId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDocumentLogConditionInput | null > | null,
  or?: Array< ModelDocumentLogConditionInput | null > | null,
  not?: ModelDocumentLogConditionInput | null,
  documentLogId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateDocumentLogInput = {
  id: string,
  documentId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  documentLogId?: string | null,
};

export type DeleteDocumentLogInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apiKey?: ModelStringInput | null,
  status?: ModelStringInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelDocumentFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  name?: ModelStringInput | null,
  issuer?: ModelStringInput | null,
  password?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  status?: ModelDocStatusInput | null,
  expiryDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  hash?: ModelStringInput | null,
  shortId?: ModelStringInput | null,
  url?: ModelStringInput | null,
  and?: Array< ModelDocumentFilterInput | null > | null,
  or?: Array< ModelDocumentFilterInput | null > | null,
  not?: ModelDocumentFilterInput | null,
  userDocumentsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelTransactionFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelTransactionTypeInput | null,
  description?: ModelTransactionDescriptionInput | null,
  amount?: ModelFloatInput | null,
  details?: ModelStringInput | null,
  documentId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  not?: ModelTransactionFilterInput | null,
  documentTransactionsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelDocumentLogFilterInput = {
  id?: ModelIDInput | null,
  documentId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDocumentLogFilterInput | null > | null,
  or?: Array< ModelDocumentLogFilterInput | null > | null,
  not?: ModelDocumentLogFilterInput | null,
  documentLogId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  apiKey?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  deleted?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  userDocumentsId?: ModelSubscriptionIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionDocumentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  issuer?: ModelSubscriptionStringInput | null,
  password?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  expiryDate?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  summary?: ModelSubscriptionStringInput | null,
  hash?: ModelSubscriptionStringInput | null,
  shortId?: ModelSubscriptionStringInput | null,
  url?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionDocumentFilterInput | null > | null,
  or?: Array< ModelSubscriptionDocumentFilterInput | null > | null,
  documentTransactionsId?: ModelSubscriptionIDInput | null,
  documentLogId?: ModelSubscriptionIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionTransactionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  details?: ModelSubscriptionStringInput | null,
  documentId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  or?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionDocumentLogFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  documentId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionDocumentLogFilterInput | null > | null,
  or?: Array< ModelSubscriptionDocumentLogFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    apiKey: string,
    status: string,
    deleted: boolean,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    apiKey: string,
    status: string,
    deleted: boolean,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    apiKey: string,
    status: string,
    deleted: boolean,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type CreateDocumentMutationVariables = {
  input: CreateDocumentInput,
  condition?: ModelDocumentConditionInput | null,
};

export type CreateDocumentMutation = {
  createDocument?:  {
    __typename: "Document",
    id: string,
    type: string,
    name: string,
    issuer: string,
    password?: string | null,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      apiKey: string,
      status: string,
      deleted: boolean,
      owner?: string | null,
    } | null,
    status?: DocStatus | null,
    expiryDate?: string | null,
    createdAt: string,
    updatedAt: string,
    summary?: string | null,
    hash?: string | null,
    shortId: string,
    url: string,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    log?:  {
      __typename: "ModelDocumentLogConnection",
      nextToken?: string | null,
    } | null,
    userDocumentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateDocumentMutationVariables = {
  input: UpdateDocumentInput,
  condition?: ModelDocumentConditionInput | null,
};

export type UpdateDocumentMutation = {
  updateDocument?:  {
    __typename: "Document",
    id: string,
    type: string,
    name: string,
    issuer: string,
    password?: string | null,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      apiKey: string,
      status: string,
      deleted: boolean,
      owner?: string | null,
    } | null,
    status?: DocStatus | null,
    expiryDate?: string | null,
    createdAt: string,
    updatedAt: string,
    summary?: string | null,
    hash?: string | null,
    shortId: string,
    url: string,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    log?:  {
      __typename: "ModelDocumentLogConnection",
      nextToken?: string | null,
    } | null,
    userDocumentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteDocumentMutationVariables = {
  input: DeleteDocumentInput,
  condition?: ModelDocumentConditionInput | null,
};

export type DeleteDocumentMutation = {
  deleteDocument?:  {
    __typename: "Document",
    id: string,
    type: string,
    name: string,
    issuer: string,
    password?: string | null,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      apiKey: string,
      status: string,
      deleted: boolean,
      owner?: string | null,
    } | null,
    status?: DocStatus | null,
    expiryDate?: string | null,
    createdAt: string,
    updatedAt: string,
    summary?: string | null,
    hash?: string | null,
    shortId: string,
    url: string,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    log?:  {
      __typename: "ModelDocumentLogConnection",
      nextToken?: string | null,
    } | null,
    userDocumentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateTransactionMutationVariables = {
  input: CreateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type CreateTransactionMutation = {
  createTransaction?:  {
    __typename: "Transaction",
    id: string,
    type?: TransactionType | null,
    description?: TransactionDescription | null,
    amount?: number | null,
    details?: string | null,
    documentId?: string | null,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentTransactionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  input: UpdateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type UpdateTransactionMutation = {
  updateTransaction?:  {
    __typename: "Transaction",
    id: string,
    type?: TransactionType | null,
    description?: TransactionDescription | null,
    amount?: number | null,
    details?: string | null,
    documentId?: string | null,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentTransactionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  input: DeleteTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type DeleteTransactionMutation = {
  deleteTransaction?:  {
    __typename: "Transaction",
    id: string,
    type?: TransactionType | null,
    description?: TransactionDescription | null,
    amount?: number | null,
    details?: string | null,
    documentId?: string | null,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentTransactionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateDocumentLogMutationVariables = {
  input: CreateDocumentLogInput,
  condition?: ModelDocumentLogConditionInput | null,
};

export type CreateDocumentLogMutation = {
  createDocumentLog?:  {
    __typename: "DocumentLog",
    id: string,
    documentId: string,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentLogId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateDocumentLogMutationVariables = {
  input: UpdateDocumentLogInput,
  condition?: ModelDocumentLogConditionInput | null,
};

export type UpdateDocumentLogMutation = {
  updateDocumentLog?:  {
    __typename: "DocumentLog",
    id: string,
    documentId: string,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentLogId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteDocumentLogMutationVariables = {
  input: DeleteDocumentLogInput,
  condition?: ModelDocumentLogConditionInput | null,
};

export type DeleteDocumentLogMutation = {
  deleteDocumentLog?:  {
    __typename: "DocumentLog",
    id: string,
    documentId: string,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentLogId?: string | null,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    apiKey: string,
    status: string,
    deleted: boolean,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      apiKey: string,
      status: string,
      deleted: boolean,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDocumentQueryVariables = {
  id: string,
};

export type GetDocumentQuery = {
  getDocument?:  {
    __typename: "Document",
    id: string,
    type: string,
    name: string,
    issuer: string,
    password?: string | null,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      apiKey: string,
      status: string,
      deleted: boolean,
      owner?: string | null,
    } | null,
    status?: DocStatus | null,
    expiryDate?: string | null,
    createdAt: string,
    updatedAt: string,
    summary?: string | null,
    hash?: string | null,
    shortId: string,
    url: string,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    log?:  {
      __typename: "ModelDocumentLogConnection",
      nextToken?: string | null,
    } | null,
    userDocumentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListDocumentsQueryVariables = {
  filter?: ModelDocumentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDocumentsQuery = {
  listDocuments?:  {
    __typename: "ModelDocumentConnection",
    items:  Array< {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTransactionQueryVariables = {
  id: string,
};

export type GetTransactionQuery = {
  getTransaction?:  {
    __typename: "Transaction",
    id: string,
    type?: TransactionType | null,
    description?: TransactionDescription | null,
    amount?: number | null,
    details?: string | null,
    documentId?: string | null,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentTransactionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListTransactionsQueryVariables = {
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsQuery = {
  listTransactions?:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      id: string,
      type?: TransactionType | null,
      description?: TransactionDescription | null,
      amount?: number | null,
      details?: string | null,
      documentId?: string | null,
      createdAt: string,
      updatedAt: string,
      documentTransactionsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDocumentLogQueryVariables = {
  id: string,
};

export type GetDocumentLogQuery = {
  getDocumentLog?:  {
    __typename: "DocumentLog",
    id: string,
    documentId: string,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentLogId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListDocumentLogsQueryVariables = {
  filter?: ModelDocumentLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDocumentLogsQuery = {
  listDocumentLogs?:  {
    __typename: "ModelDocumentLogConnection",
    items:  Array< {
      __typename: "DocumentLog",
      id: string,
      documentId: string,
      createdAt: string,
      updatedAt: string,
      documentLogId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    apiKey: string,
    status: string,
    deleted: boolean,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    apiKey: string,
    status: string,
    deleted: boolean,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    apiKey: string,
    status: string,
    deleted: boolean,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnCreateDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentFilterInput | null,
  owner?: string | null,
};

export type OnCreateDocumentSubscription = {
  onCreateDocument?:  {
    __typename: "Document",
    id: string,
    type: string,
    name: string,
    issuer: string,
    password?: string | null,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      apiKey: string,
      status: string,
      deleted: boolean,
      owner?: string | null,
    } | null,
    status?: DocStatus | null,
    expiryDate?: string | null,
    createdAt: string,
    updatedAt: string,
    summary?: string | null,
    hash?: string | null,
    shortId: string,
    url: string,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    log?:  {
      __typename: "ModelDocumentLogConnection",
      nextToken?: string | null,
    } | null,
    userDocumentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentFilterInput | null,
  owner?: string | null,
};

export type OnUpdateDocumentSubscription = {
  onUpdateDocument?:  {
    __typename: "Document",
    id: string,
    type: string,
    name: string,
    issuer: string,
    password?: string | null,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      apiKey: string,
      status: string,
      deleted: boolean,
      owner?: string | null,
    } | null,
    status?: DocStatus | null,
    expiryDate?: string | null,
    createdAt: string,
    updatedAt: string,
    summary?: string | null,
    hash?: string | null,
    shortId: string,
    url: string,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    log?:  {
      __typename: "ModelDocumentLogConnection",
      nextToken?: string | null,
    } | null,
    userDocumentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentFilterInput | null,
  owner?: string | null,
};

export type OnDeleteDocumentSubscription = {
  onDeleteDocument?:  {
    __typename: "Document",
    id: string,
    type: string,
    name: string,
    issuer: string,
    password?: string | null,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      apiKey: string,
      status: string,
      deleted: boolean,
      owner?: string | null,
    } | null,
    status?: DocStatus | null,
    expiryDate?: string | null,
    createdAt: string,
    updatedAt: string,
    summary?: string | null,
    hash?: string | null,
    shortId: string,
    url: string,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    log?:  {
      __typename: "ModelDocumentLogConnection",
      nextToken?: string | null,
    } | null,
    userDocumentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction?:  {
    __typename: "Transaction",
    id: string,
    type?: TransactionType | null,
    description?: TransactionDescription | null,
    amount?: number | null,
    details?: string | null,
    documentId?: string | null,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentTransactionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction?:  {
    __typename: "Transaction",
    id: string,
    type?: TransactionType | null,
    description?: TransactionDescription | null,
    amount?: number | null,
    details?: string | null,
    documentId?: string | null,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentTransactionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction?:  {
    __typename: "Transaction",
    id: string,
    type?: TransactionType | null,
    description?: TransactionDescription | null,
    amount?: number | null,
    details?: string | null,
    documentId?: string | null,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentTransactionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateDocumentLogSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentLogFilterInput | null,
  owner?: string | null,
};

export type OnCreateDocumentLogSubscription = {
  onCreateDocumentLog?:  {
    __typename: "DocumentLog",
    id: string,
    documentId: string,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentLogId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateDocumentLogSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentLogFilterInput | null,
  owner?: string | null,
};

export type OnUpdateDocumentLogSubscription = {
  onUpdateDocumentLog?:  {
    __typename: "DocumentLog",
    id: string,
    documentId: string,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentLogId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteDocumentLogSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentLogFilterInput | null,
  owner?: string | null,
};

export type OnDeleteDocumentLogSubscription = {
  onDeleteDocumentLog?:  {
    __typename: "DocumentLog",
    id: string,
    documentId: string,
    document?:  {
      __typename: "Document",
      id: string,
      type: string,
      name: string,
      issuer: string,
      password?: string | null,
      userId: string,
      status?: DocStatus | null,
      expiryDate?: string | null,
      createdAt: string,
      updatedAt: string,
      summary?: string | null,
      hash?: string | null,
      shortId: string,
      url: string,
      userDocumentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    documentLogId?: string | null,
    owner?: string | null,
  } | null,
};
