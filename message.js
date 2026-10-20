export const WHATSAPP_NUMBER = '5511930919355';

export const deviceOptions = {
  Celular: {
    brands: ['Apple', 'Samsung', 'Motorola', 'Xiaomi', 'Realme', 'Asus', 'LG', 'Nokia', 'Outra marca', 'Não sei a marca'],
    placeholder: 'Ex.: Galaxy A54',
    example: 'Ex.: o celular caiu no chão. A tela trincou e o toque parou de funcionar.',
    services: ['Tela ou vidro', 'Bateria', 'Não carrega / conector', 'Câmera', 'Áudio ou microfone', 'Não liga', 'Sistema ou desempenho', 'Contato com líquido / queda', 'Outro / preciso de avaliação']
  },
  Tablet: {
    brands: ['Apple', 'Samsung', 'Lenovo', 'Xiaomi', 'Multilaser', 'Positivo', 'Outra marca', 'Não sei a marca'],
    placeholder: 'Ex.: iPad 9ª geração',
    example: 'Ex.: o tablet começou a descarregar rápido e agora só liga conectado na tomada.',
    services: ['Tela ou vidro', 'Bateria', 'Não carrega / conector', 'Câmera', 'Áudio ou microfone', 'Não liga', 'Sistema ou desempenho', 'Contato com líquido / queda', 'Outro / preciso de avaliação']
  },
  Notebook: {
    brands: ['Dell', 'Lenovo', 'HP', 'Acer', 'Asus', 'Samsung', 'Apple', 'Positivo', 'Vaio', 'Avell', 'Outra marca', 'Não sei a marca'],
    placeholder: 'Ex.: Dell Inspiron 15',
    example: 'Ex.: o notebook desligou durante o uso e agora não liga nem conectado ao carregador.',
    services: ['Tela', 'Bateria', 'Não carrega / alimentação', 'Teclado ou touchpad', 'Áudio, câmera ou microfone', 'Não liga', 'Lentidão / sistema', 'Aquecimento', 'Contato com líquido / queda', 'Outro / preciso de avaliação']
  }
};

const clean = (value, max) => String(value ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max);

export function buildMessage({device, brand, model, service, description}) {
  return [
    'Olá, BL! Gostaria de atendimento para meu aparelho.',
    '',
    `Aparelho: ${clean(device, 30) || 'Não informado'}`,
    `Marca: ${clean(brand, 50) || 'Não informada'}`,
    `Modelo: ${clean(model, 80) || 'Não informado'}`,
    `Serviço ou problema: ${clean(service, 80) || 'Não informado'}`,
    '',
    'O que aconteceu:',
    clean(description, 900) || 'Ainda não descrito.',
    '',
    'Como podemos seguir com a avaliação?'
  ].join('\n');
}

export function buildWhatsAppUrl(values) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(values))}`;
}
