const config = {
  'botnet': {
    'target': 'crush-fitness',
    'script': 'hacks/basic.js',
  },
  'server':{
    'target': 'crush-fitness',
    'script': 'hacks/basic.js',
    'server_amount': 50,
    'server_ram_level': 13,
    'server_name': 'testowys'
  }
};

export function getConfig(ns) {
  return config;
}