/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');

const servers = [
  {
    name: 'Servidor 1',
    url: 'http://localhost:4001',
    developer: {
      name: 'Helder Burato Berto',
      phone: process.env.HELDER_PHONE,
    },
  },
  {
    name: 'Servidor 2',
    url: 'http://localhost:4002',
    developer: {
      name: 'Paula Nunes Estevam Berto',
      phone: process.env.PAULA_PHONE,
    },
  },
];

setInterval(() => {
  console.log('📡 Iniciando monitoramento dos servidores');

  for (const server of servers) {
    axios({
      url: server.url,
      method: 'get',
    })
      .then(() => {
        console.log(`✅ ${server.name} está no ar!`);
      })
      .catch(() => {
        console.log(`🚫 ${server.name} está fora do ar!`);
      });
  }

  console.log('🔌 Finalizando monitoramento dos servidores.');
}, 1000);
