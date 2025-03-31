import jwt from 'jsonwebtoken';
import axios from 'axios';

export const auth = async (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.slice(7);

    try {
        const decodedHeader: any = jwt.decode(token, { complete: true });
        const kid = decodedHeader?.header?.kid;
        if (!kid) return res.status(400).json({ error: 'Missing kid in token' });

        // キャッシュを利用するか検討する(現状の実装では厳しい)
        const resKey = await axios.get('http://localhost:6666/pubKey');
        console.log("resKey:", resKey)
        const pubKey = resKey.data.pub_key;
        console.log("pubKey:", pubKey)

        const payload = jwt.verify(token, pubKey, {
            algorithms: ['RS256'],
            issuer: 'https://auth.local'
        });
        req.user = payload; // ユーザー情報をリクエストに保存
        next();
    } catch (err) {
        console.error(err)
    }
}
