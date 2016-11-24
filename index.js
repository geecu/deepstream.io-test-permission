const DeepstreamClient = require( 'deepstream.io-client-js' );

const deepstreamUrl = '127.0.0.1:6020';
const providerCredentials = {
  username: 'provider',
  password: 'provider',
};
const clientCredentials = {
  username: 'client',
  password: 'client',
};

const provider = new DeepstreamClient(deepstreamUrl);
provider.login(providerCredentials);
provider.record.listen('test/*', (match, isSubscribed, response) => {
  console.log('provider matched', match);
  if (isSubscribed) {
    response.accept()

    const record = provider.record.getRecord(match);
    record.set({
      test: true,
      match
    })
  } else {
    client.record.getRecord(match).discard()
  }
});

const client = new DeepstreamClient(deepstreamUrl);
client.login(clientCredentials);
client.on('error', (err, reason) => {
    console.log('Client error', err, reason)
})

const record = client.record.getRecord('test/record');
record.subscribe(() => {
    console.log('got record', record.get());
})
