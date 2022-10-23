// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'pwo0fbqce2'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // DONE
  domain: 'dev-uiwq4vyd0510ke14.us.auth0.com',            // Auth0 domain
  clientId: '7XnplsypI6hodYLUUGdM8RLPnSXsBGUs',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
