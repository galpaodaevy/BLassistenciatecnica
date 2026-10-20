import {deviceOptions, buildMessage, buildWhatsAppUrl} from './message.js';

const form = document.querySelector('#repair-form');
const brand = document.querySelector('#brand');
const model = document.querySelector('#model');
const service = document.querySelector('#service');
const description = document.querySelector('#description');
const preview = document.querySelector('#message-preview');
const count = document.querySelector('#description-count');
const status = document.querySelector('#form-status');
const fallback = document.querySelector('#whatsapp-fallback');
const selectedDevice = () => form.querySelector('input[name="device"]:checked').value;
const values = () => ({device: selectedDevice(), brand: brand.value, model: model.value, service: service.value, description: description.value});

function updatePreview() {
  preview.textContent = buildMessage(values());
  count.textContent = `${description.value.length}/900`;
  fallback.href = buildWhatsAppUrl(values());
  fallback.hidden = true;
  status.textContent = '';
}

function fillSelect(select, options, placeholder, previous='') {
  select.replaceChildren(new Option(placeholder, ''));
  options.forEach(label => select.add(new Option(label, label)));
  if (options.includes(previous)) select.value = previous;
}

function changeDevice() {
  const options = deviceOptions[selectedDevice()];
  fillSelect(brand, options.brands, 'Selecione a marca', brand.value);
  fillSelect(service, options.services, 'Selecione o serviço ou problema');
  model.placeholder = options.placeholder;
  description.placeholder = options.example;
  model.value = '';
  updatePreview();
}

form.querySelectorAll('input[name="device"]').forEach(input => input.addEventListener('change', changeDevice));
form.addEventListener('input', updatePreview);
form.addEventListener('change', updatePreview);
model.addEventListener('input', () => model.setCustomValidity(''));
description.addEventListener('input', () => description.setCustomValidity(''));

function validate() {
  model.setCustomValidity(model.value.trim() ? '' : 'Informe o modelo ou escreva “não sei”.');
  description.setCustomValidity(description.value.trim().length >= 5 ? '' : 'Conte brevemente o que aconteceu com o aparelho.');
  return form.reportValidity();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validate()) return;
  const url = buildWhatsAppUrl(values());
  fallback.href = url;
  fallback.hidden = false;
  status.textContent = 'Mensagem preparada. Revise e envie no WhatsApp. Se a nova aba não abrir, use o link abaixo.';
  window.open(url, '_blank', 'noopener,noreferrer');
});

document.querySelector('#copy-message').addEventListener('click', async () => {
  if (!validate()) return;
  try {
    await navigator.clipboard.writeText(buildMessage(values()));
    status.textContent = 'Mensagem copiada. Você também pode colar na conversa com a BL.';
  } catch {
    document.querySelector('.message-preview').open = true;
    status.textContent = 'Selecione o texto da mensagem acima para copiar.';
  }
});

changeDevice();
