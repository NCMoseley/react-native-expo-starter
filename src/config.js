import Constants from 'expo-constants';

const channel = Constants.manifest.releaseChannel;
let apiRequestUrl = null;
let providerApiUrl = null;

switch (channel) {
    case 'staging':
        break;
    case 'production':
        break;
    default:
        apiRequestUrl = 'https://member-api-staging.simplybenefits.ca';
        providerApiUrl = 'https://provider-api-staging.simplybenefits.ca';
        break;
}

export default {
    apiRequestUrl,
    providerApiUrl
};