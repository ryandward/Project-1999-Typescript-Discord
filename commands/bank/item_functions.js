import axios from 'axios';
import puppeteer from 'puppeteer';
export async function getImageUrl(itemName) {
    // Standardize the item name to ensure cache consistency
    const standardizedItemName = itemName.replace('Song: ', '').replace('Spell: ', '');
    // If not in cache, proceed to fetch the image URL
    const baseUrl = 'http://localhost/mediawiki/api.php';
    const searchParams = new URLSearchParams({
        action: 'query',
        prop: 'revisions',
        titles: standardizedItemName,
        rvprop: 'content',
        format: 'json',
    });
    try {
        const searchResponse = await axios.get(baseUrl, { params: searchParams });
        const pageId = Object.keys(searchResponse.data.query.pages)[0];
        const pageData = searchResponse.data.query.pages[pageId];
        if (!pageData.revisions) {
            console.log(searchResponse.data);
            return null;
        }
        const lucyImgIdMatch = pageData.revisions[0]['*'].match(/lucy_img_ID\s*=\s*(\d+)/);
        const spelliconMatch = pageData.revisions[0]['*'].match(/spellicon\s*=\s*(\w+)/);
        let filename;
        if (lucyImgIdMatch) {
            const imageId = lucyImgIdMatch[1];
            filename = `item_${imageId}.png`;
        }
        else if (spelliconMatch) {
            const imageId = spelliconMatch[1];
            filename = `Spellicon_${imageId}.png`;
        }
        else {
            return null;
        }
        const imageInfoParams = new URLSearchParams({
            action: 'query',
            prop: 'imageinfo',
            titles: `File:${filename}`,
            iiprop: 'url',
            format: 'json',
        });
        const imageInfoResponse = await axios.get(baseUrl, {
            params: imageInfoParams,
        });
        const imagePageId = Object.keys(imageInfoResponse.data.query.pages)[0];
        const imagePageData = imageInfoResponse.data.query.pages[imagePageId];
        if (imagePageData.imageinfo) {
            let imageUrl = imagePageData.imageinfo[0].url;
            imageUrl = imageUrl.replace('http://localhost:80/mediawiki/images', '/var/lib/mediawiki');
            // Cache the image URL for future use
            return imageUrl;
        }
    }
    catch (error) {
        console.error('Error fetching image URL:', error);
        return null;
    }
    return null;
}
export async function getItemUrl(itemName) {
    // Standardize the item name to ensure cache consistency
    const standardizedItemName = itemName.replace('Song: ', '').replace('Spell: ', '');
    const baseUrl = 'http://localhost/mediawiki/api.php';
    const searchParams = new URLSearchParams({
        action: 'query',
        prop: 'info',
        inprop: 'url',
        titles: standardizedItemName,
        format: 'json',
    });
    const searchResponse = await axios.get(baseUrl, { params: searchParams });
    // Return the 'fullurl' property of the page
    return (searchResponse.data.query.pages[Object.keys(searchResponse.data.query.pages)[0]].fullurl || null);
}
export async function getItemStatsText(itemName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const itemUrl = await getItemUrl(itemName);
    if (itemUrl) {
        await page.goto(itemUrl);
    }
    else {
        console.error('Item URL is null');
        await browser.close();
        return null;
    }
    // Primary stats element
    const statsElement = await page.$('#mw-content-text > div.mw-parser-output > div.itembg > div > p');
    if (!statsElement) {
        console.log('No stats element found with the given selector. Attempting fallback...');
        return 'No stats found';
    }
    else {
        const statsText = await page.evaluate(element => element.textContent || '', statsElement);
        await browser.close();
        return statsText.trim();
    }
}
export async function getSpellLevels(spellName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const itemUrl = await getItemUrl(spellName);
    if (itemUrl) {
        await page.goto(itemUrl);
    }
    else {
        console.error('Item URL is null');
        await browser.close();
        return null;
    }
    // Find the first two h2 elements
    const h2Elements = await page.$$('h2');
    let statsText = '';
    // Ensure to only process the first two h2 elements
    for (let i = 0; i < Math.min(h2Elements.length, 1); i++) {
        // Get the next sibling element of each h2, which contains the desired content
        const nextElement = await h2Elements[i].evaluateHandle(el => el.nextElementSibling);
        // Extract text content if the element exists
        const nextElementText = await (await nextElement.getProperty('textContent')).jsonValue();
        statsText += nextElementText + '\n';
    }
    await browser.close();
    return statsText.trim();
}
export async function getSpellDescription(spellName) {
    // Standardize the item name to ensure cache consistency
    const standardizedItemName = spellName.replace('Song: ', '').replace('Spell: ', '');
    // If not in cache, proceed to fetch the image URL
    const baseUrl = 'http://localhost/mediawiki/api.php';
    const searchParams = new URLSearchParams({
        action: 'query',
        prop: 'revisions',
        titles: standardizedItemName,
        rvprop: 'content',
        format: 'json',
    });
    try {
        const searchResponse = await axios.get(baseUrl, { params: searchParams });
        const pageId = Object.keys(searchResponse.data.query.pages)[0];
        const pageData = searchResponse.data.query.pages[pageId];
        if (!pageData.revisions) {
            console.log(searchResponse.data);
            return null;
        }
        const spellDescription = pageData.revisions[0]['*'].match(/description\s*=\s*(.*)/);
        if (spellDescription) {
            return spellDescription[1];
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching spell description:', error);
        return null;
    }
}
