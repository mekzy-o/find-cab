import { UserAttributes } from "../database/models/user";

/**
  * @function filterPassword
  * @description creates a new user in the user database
  * @param {*} data represent user details
  * @returns {object} user object
  */
 export const filterOutPassword = (data: UserAttributes) => {
    let userData:any = data;
    const filterOutKeys = ['password'];

    if (!Array.isArray(data)) userData = [data];
    const filteredData = userData.map((singleData:string) => Object.keys(singleData)
      .reduce((object:any, key:any) => {
        if (!filterOutKeys.includes(key)) object[key] = singleData[key];
        return object;
      }, {}));
    return (filteredData.length === 1 && !Array.isArray(data)) ? filteredData[0] : filteredData;
  };