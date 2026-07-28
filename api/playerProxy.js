export default async function handler(req, res) {
    // Configurações de CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { animeId, temp, ep } = req.query || {};

        if (!animeId || !temp || !ep) {
            return res.status(400).json({ error: 'Parâmetros animeId, temp e ep são obrigatórios.' });
        }

        const rawBaseUrl = process.env.PLAYER_BASE_URL || 'https://serv01.meusdoramas.club';
        const baseUrl = rawBaseUrl.replace(/\/+$/, '');

        const response = await fetch(`${baseUrl}/`, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': `${baseUrl}/`,
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({
                error: `O servidor de origem retornou status HTTP ${response.status}`
            });
        }

        let html = await response.text();

        // Script para direcionar para o vídeo correto no hash router do player
        const baseTag = `<base href="${baseUrl}/"><script>window.location.hash = "#/video/${animeId}/${temp}/${ep}/";</script>`;

        if (html.includes('<head>')) {
            html = html.replace('<head>', `<head>${baseTag}`);
        } else {
            html = `${baseTag}${html}`;
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(html);
    } catch (error) {
        console.error('Erro de execução no playerProxy:', error);
        return res.status(500).json({
            error: 'Erro interno ao processar a requisição',
            details: error.message || String(error)
        });
    }
}