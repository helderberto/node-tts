/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
const axios = require('axios');
const TotalVoice = require('totalvoice-node');

require('dotenv').config();

const client = new TotalVoice(process.env.TOTALVOICE_ACCESS_TOKEN);

const servers = [
  {
    name: 'Servidor 1',
    url: 'http://localhost:4001',
    developer: {
      name: process.env.DEVELOPER_ONE_NAME,
      telephone: process.env.DEVELOPER_ONE_PHONE,
    },
  },
  {
    name: 'Servidor 2',
    url: 'http://localhost:4002',
    developer: {
      name: process.env.DEVELOPER_TWO_NAME,
      telephone: process.env.DEVELOPER_TWO_PHONE,
    },
  },
];

(async function () {
  console.log('📡 Iniciando monitoramento dos servidores...');

  for (const server of servers) {
    await axios({
      url: server.url,
      method: 'get',
    })
      .then(() => {
        console.log(`${server.name} está no ar!`);
      })
      .catch(() => {
        console.log(`🚫 ${server.name} está fora do ar!`);
        const message = `${server.developer.name} o servidor ${server.name} está fora do ar, por favor, faça alguma coisa o mais rápido possível.`;

        const options = {
          velocidade: 2,
          tipo_voz: 'br-Vitoria',
        };

        client.tts.enviar(server.developer.telephone, message, options).then(() => {
          console.log(`O desenvolvedor ${server.developer.name} já foi avisado!`);
        });
      });
  }

  console.log('🔌 Finalizando monitoramento dos servidores.');
}());
