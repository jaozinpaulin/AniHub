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
        return res.status(400).json({ error: 'Parâmetros ausentes.' });
    }

    const baseUrl = process.env.PLAYER_BASE_URL;

    if (!baseUrl) {
        console.error('PLAYER_BASE_URL não está configurada nas variáveis de ambiente.');
        return res.status(500).json({ error: 'Erro de configuração interna do servidor.' });
    }

    const targetUrl = `${baseUrl}/#/video/${animeId}/${temp}/${ep}/`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta da origem: ${response.status}`);
        }

        const data = await response.text();

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(data);
    } catch (error) {
        console.error('Erro no playerProxy:', error.message);
        return res.status(500).json({ error: 'Erro ao buscar o conteúdo do player.' });
    }
};

