import { NextResponse } from 'next/server';

const sjcl = require('sjcl');

function decryptPassword(password, secretKey) {
  try {
    const decrypted = sjcl.decrypt(secretKey, password);
    return decrypted;
  } catch (error) {
    return null; 
  }
}

export async function POST(request) {
  try {
    const { passwords } = await request.json();

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error('SECRET_KEY environment variable is not set');
    }

    const decryptedPasswords = passwords.map(password => decryptPassword(password, secretKey)).filter(Boolean);

    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ passwords: decryptedPasswords })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch predictions');
    }

    const data = await response.json();
    const newPredictions = {};
    decryptedPasswords.forEach((password, i) => {
      newPredictions[passwords[i]] = data.predictions[i].strength;
    });

    return NextResponse.json({ predictions: newPredictions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to predict password strength', error: error.message }, { status: 500 });
  }
}
