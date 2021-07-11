import swagger from './swagger.json';
import { loginDocs, signupDocs } from './auth';
import { searchLocationDocs, saveLocations } from './location';
import { generateVerificationLink } from './verification';

swagger.paths['/auth/signin'] = loginDocs;
swagger.paths['/auth/signup'] = signupDocs;
swagger.paths['/location'] = saveLocations;
swagger.paths['/location/search'] = searchLocationDocs;
swagger.paths['/verification'] = generateVerificationLink;

export default swagger;