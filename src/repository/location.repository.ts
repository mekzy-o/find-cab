// import Sequelize from 'sequelize'
import db from '../database/models';

export const create = async(userid: any, body:{latitude: string, longitude:string}) => {
    const location = await db.Location.create({...body, userid})
    return location;
}

export const getClosestLocation = async(latitude: string, longitude:string) => {
   const location = await db.sequelize.query(`
    SELECT Users.name, Users.car_number, Users.phone_number, latitude, longitude
   FROM (
    SELECT z.latitude, z.longitude, z.userid, z.id,
           p.radius,
           p.distance_unit
                    * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(p.latpoint))
                    * COS(RADIANS(z.latitude))
                    * COS(RADIANS(p.longpoint - z.longitude))
                    + SIN(RADIANS(p.latpoint))
                    * SIN(RADIANS(z.latitude))))) AS distance
     FROM locations AS z
     JOIN ( 
           SELECT ${latitude}  AS latpoint,  ${longitude} AS longpoint,
                   15.0 AS radius,      111.045 AS distance_unit
       ) AS p ON 1=1
     WHERE z.latitude
        BETWEEN p.latpoint  - (p.radius / p.distance_unit)
            AND p.latpoint  + (p.radius / p.distance_unit)
       AND z.longitude
        BETWEEN p.longpoint - (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))
            AND p.longpoint + (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))
    ) AS d
    JOIN Users ON d.userid=Users.id
    WHERE distance <= radius
    ORDER BY distance
    LIMIT 15`);

 return location[0];
}
