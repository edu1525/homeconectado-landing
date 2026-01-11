import * as functions from 'firebase-functions';

// Função para autenticar com a Tuya
export const testTuya = functions.https.onRequest((req, res) => {
  console.log('=== HTTP FUNCTION CALLED ===');
  console.log('Method:', req.method);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  
  // Configurar CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  // Sempre retornar sucesso para testar
  console.log('✅ Retornando sucesso para teste');
  res.status(200).json({
    success: true,
    message: 'Teste bem-sucedido!',
    data: { token: 'test-token' }
  });
});