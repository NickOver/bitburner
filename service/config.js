const config = {
  'botnet': {
    'target': 'n00dles',
    'script': 'hacks/basic.js',
  },
  'server':{
    'target': 'crush-fitness',
    'script': 'hacks/basic.js',
    'server_amount': 1,
    'server_ram_level': 7,
    'server_name': 'testowys'
  },
  'botnet-complex': {
    'scripts': {
      'hack': 'hacks/hack.js',
      'grow': 'hacks/grow.js',
      'weaken': 'hacks/weaken.js',
    }
  }
};

export function getConfig(ns) {
  return config;
}