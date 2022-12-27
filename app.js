const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    axios
        .get('https://id.wikipedia.org/wiki/Daftar_negara_menurut_benua')
        .then(response => {
            if(response.status === 200) {
                const $ = cheerio.load(response.data);
                let data = [];
                $('.wikitable').each(function(t, table) {
                    // Africa
                    if(t == 0) {
                        $(table).find('tbody tr').each(function(i, elem) {
                            if($(elem).find('td:nth-child(1) > a').text().trim() != "") {
                                data.push({
                                    nama: $(elem).find('td:nth-child(1) > a').text().trim(),
                                    ibukota: $(elem).find('td:nth-child(3)').text().trim(),
                                    bendera: "https:" + $(elem).find('td:nth-child(2) img').attr("src"),
                                    benua: "Afrika"
                                });
                            }
                        });
                    }
                    // Asia
                    if(t == 1) {
                        $(table).find('tbody tr').each(function(i, elem) {
                            if($(elem).find('td:nth-child(2) > a').text().trim() != "") {
                                data.push({
                                    nama: $(elem).find('td:nth-child(2) > a').text().trim(),
                                    ibukota: $(elem).find('td:nth-child(5) > a:first-child').text().trim(),
                                    bendera: "https:" + $(elem).find('td:nth-child(1) img').attr("src"),
                                    benua: "Asia"
                                });
                            }
                        });
                    }
                    // Europe
                    if(t == 2) {
                        $(table).find('tbody tr').each(function(i, elem) {
                            if($(elem).find('td:nth-child(3) > a').text().trim() != "") {
                                data.push({
                                    nama: $(elem).find('td:nth-child(3) > a').text().trim(),
                                    ibukota: $(elem).find('td:nth-child(7) > a:first-child').length > 0 ? $(elem).find('td:nth-child(7) > a:first-child').text().trim() : $(elem).find('td:nth-child(7)').children().remove().end().text().trim(),
                                    bendera: "https:" + $(elem).find('td:nth-child(1) img').attr("src"),
                                    benua: "Eropa"
                                });
                            }
                        });
                    }
                    // North and Center America
                    if(t == 3) {
                        $(table).find('tbody tr').each(function(i, elem) {
                            if($(elem).find('td:nth-child(2) > a').text().trim() != "") {
                                data.push({
                                    nama: $(elem).find('td:nth-child(2) > a').text().trim(),
                                    ibukota: $(elem).find('td:nth-child(5) > a:first-child').text().trim(),
                                    bendera: "https:" + $(elem).find('td:nth-child(1) img').attr("src"),
                                    benua: "Amerika"
                                });
                            }
                        });
                    }
                    // South America
                    if(t == 4) {
                        $(table).find('tbody tr').each(function(i, elem) {
                            if($(elem).find('td:nth-child(2) a').text().trim() != "") {
                                data.push({
                                    nama: $(elem).find('td:nth-child(2) a').text().trim(),
                                    ibukota: $(elem).find('td:nth-child(5) a').text().trim(),
                                    bendera: "https:" + $(elem).find('td:nth-child(1) img').attr("src"),
                                    benua: "Amerika"
                                });
                            }
                        });
                    }
                    // Oceania
                    if(t == 5) {
                        $(table).find('tbody tr').each(function(i, elem) {
                            if($(elem).find('td:nth-child(2) > a').text().trim() != "") {
                                data.push({
                                    nama: $(elem).find('td:nth-child(2) > a').text().trim(),
                                    ibukota: $(elem).find('td:nth-child(6) span[lang=en]').length > 0 ? $(elem).find('td:nth-child(6) span[lang=en]').text().trim() : $(elem).find('td:nth-child(6) > a:first-child').text().trim(),
                                    bendera: "https:" + $(elem).find('td:nth-child(1) img').attr("src"),
                                    benua: "Oseania"
                                });
                            }
                        });
                    }
                });
                data = data.filter(n => n !== undefined);
                res.json(data);
            }
        })
        .catch(error => {
            console.log(error);
        })
});

app.use((req, res, next) => {
    res.status(404).send('Route is not found!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});