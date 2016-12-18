export interface IResponse {
key?: string;
topic: string;
text: string;
user: IUser;
dateCreated: String;
}

export interface UserCredentials {
email: string;
password: string;
}

export interface IUser {
uid: string;
username: string;
}

export interface Predicate<T> {
(item: T): boolean;
}

export interface ValidationResult {
[key: string]: boolean;
}

export interface ITopic {
key?: string;
subject: string,
description: string,
tagz: string,
milesAway: number,
category: string,
parentCategory:string,
dateCreated: String
user: IUser;
numOfcomments: number;
}

export interface Category{
  name:string,
  parentCategory:string
}

export interface PageInterface {
title: string;
component: any;
icon: string;
logsOut?: boolean;
index?: number;
}