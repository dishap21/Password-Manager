const sjcl = require('sjcl');

export async function POST(request) {
    try {
        const { password } = await request.json();
        const secretKey = process.env.SECRET_KEY;
        const decryptedPassword = decryptPassword(password, secretKey);
        return new Response(JSON.stringify({ decryptedPassword }), { status: 200 });
    } catch (err) {
        console.log(err.message);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

function decryptPassword(password, secretKey) {
    const decrypted = sjcl.decrypt(secretKey, password);
    return decrypted;
}
