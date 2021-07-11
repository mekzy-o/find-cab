import { LocationAttributes } from "../database/models/location";
import { ApplicationError } from "../lib";
import { Location, User } from '../repository';
import { locationValidator } from '../validators';

export const createLocation = async (userId: any, body: LocationAttributes) => {
   await locationValidator.validate(body);
   const foundUser = await User.getUserById(userId);
   if(foundUser){
      throw new ApplicationError({message: "OOPs!, You  already added your location"})
   }
   const location = await Location.create(userId, body);
   return location;
}

export const getClosestLocation =  async (query: any) => {
   await locationValidator.validate(query);
   const { latitude, longitude } = query;
   const getLocation = await Location.getClosestLocation(latitude, longitude);
   return getLocation;
}

export default {
    getClosestLocation,
    createLocation
}

