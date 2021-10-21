export const appKey = "49f68a5c8493ec2c0bf489821c21fc3b";
//export const appKey = "b1d26eaa13c9a50eda759ec6580344fc";//pravi trello 1
export const baseURL = "http://localhost:5000/";
//export const baseURL = "https://api.trello.com/"; //2
export const apiVersion = "api/v1/";
//export const apiVersion = "1/"; //3
export const tokenEndPoint = "token";
export const mineBoardsEndPoint = "members/me/boards";
export const boardsPoint = "board/";
export const boardEndPoint = "board";
export const listsEndPoint = "lists";
export const listPoint = "list/";
export const membersEndPoint = 'members';
export const actionsComments = '/actions/comments'
export const cardsEndpoint = "cards/";//trello ne podrzava jedninu
//export const adminToken = 'ac4e5383b2b706bf4a19a47c3dc109197329daa95b61eb9f34a08cee09656969';
export const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjM0MTk3OTIyLCJleHAiOjE2MzQyNDExMjJ9.Z8eopabuIug80XZGW_mpfbFy2vH8zT2StITcHEW8vxU"
export const userToken = "";

export const getToken = () => {
    return localStorage.getItem('token');
}

export var index = 0;
export const incrementIndex = () => {
    index++;
    return (index - 1);
}