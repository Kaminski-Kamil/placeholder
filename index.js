const express = require('express');
const sharp = require('sharp');
const app = express();

app.get('/placeholder/:width/:height', async (req, res) => {
    const { width, height } = req.params;

    if (isNaN(width) || isNaN(height)) {
        return res.status(400).send('Width and height must be valid numbers');
    }

    const w = parseInt(width);
    const h = parseInt(height);

    try {
        const image = await sharp({
            create: {
                width: w,
                height: h,
                channels: 3, 
                background: { r: 211, g: 213, b: 215 }, 
            },
        })
            .png()
            .toBuffer(); 

        res.set('Content-Type', 'image/png');
        res.send(image);
    } catch (err) {
        res.status(500).send('Error generating image: ' + err.message);
    }
});

app.listen(8080);