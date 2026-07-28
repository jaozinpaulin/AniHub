module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { animeId, temp, ep } = req.query;

    if (!animeId || !temp || !ep) {
        return res.status(400).json({ error: 'Parâmetros ausentes na query string.' });
    }

    // Remove barra no final de baseUrl se existir para evitar "//"
    const rawBaseUrl = process.env.PLAYER_BASE_URL || '';
    const baseUrl = rawBaseUrl.replace(/\/+$/, '');

    if (!baseUrl) {
        console.error('PLAYER_BASE_URL não está configurada na Vercel.');
        return res.status(500).json({ error: 'PLAYER_BASE_URL não configurada.' });
    }

    // Monta a URL de destino
    const targetUrl = `${baseUrl}/video/${animeId}/${temp}/${ep}/`;
    console.log('Tentando buscar URL de origem:', targetUrl);

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': baseUrl,
            },
        });

        if (!response.ok) {
            console.error(`Erro da origem. Status: ${response.status} - URL: ${targetUrl}`);
            return res.status(response.status).json({
                error: `A origem retornou status ${response.status}`,
                urlTentada: targetUrl
            });
        }

        const data = await response.text();

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(data);
    } catch (error) {
        console.error('Erro de conexão no fetch:', error.message);
        return res.status(500).json({ error: 'Erro de conexão com o servidor de origem.' });
    }
};