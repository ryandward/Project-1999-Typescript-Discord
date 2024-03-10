import axios from 'axios';
import puppeteer from 'puppeteer';

interface MediaWikiResponse {
  query: {
    pages: {
      [key: string]: {
        fullurl?: string;
        revisions?: [{ '*': string }];
        imageinfo?: [{ url: string }];
      };
    };
  };
}

export function formatField(field: string[]): string {
  return '```\n' + field.join('\n') + '\n```';
}

const baseUrl = 'http://localhost/mediawiki/api.php';

async function fetchMediaWikiResponse(params: URLSearchParams): Promise<MediaWikiResponse | null> {
  try {
    const response = await axios.get<MediaWikiResponse>(baseUrl, { params });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching from MediaWiki:', error);
    return null;
  }
}

export async function getImageUrl(itemName: string): Promise<string | null> {
  const standardizedItemName = itemName.replace(/(Song: |Spell: )/g, '');
  const searchParams = new URLSearchParams({
    action: 'query',
    prop: 'revisions',
    titles: standardizedItemName,
    rvprop: 'content',
    format: 'json',
  });

  const searchResponse = await fetchMediaWikiResponse(searchParams);
  if (!searchResponse) return null;

  const pageId = Object.keys(searchResponse.query.pages)[0];
  const pageData = searchResponse.query.pages[pageId];
  if (!pageData.revisions) return null;

  const content = pageData.revisions[0]['*'];
  const lucyImgIdMatch = content.match(/lucy_img_ID\s*=\s*(\d+)/);
  const spelliconMatch = content.match(/spellicon\s*=\s*(\w+)/);

  let filename;
  if (lucyImgIdMatch) {
    filename = `item_${lucyImgIdMatch[1]}.png`;
  }
  else if (spelliconMatch) {
    filename = `Spellicon_${spelliconMatch[1]}.png`;
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

  const imageInfoResponse = await fetchMediaWikiResponse(imageInfoParams);
  if (!imageInfoResponse) return null;

  const imagePageId = Object.keys(imageInfoResponse.query.pages)[0];
  const imagePageData = imageInfoResponse.query.pages[imagePageId];
  if (!imagePageData.imageinfo) return null;

  let imageUrl = imagePageData.imageinfo[0].url;
  imageUrl = imageUrl.replace('http://localhost:80/mediawiki/images', '/var/lib/mediawiki');
  return imageUrl;
}

export async function getItemUrl(itemName: string): Promise<string | null> {
  const standardizedItemName = itemName.replace(/(Song: |Spell: )/g, '');
  const searchParams = new URLSearchParams({
    action: 'query',
    prop: 'info',
    inprop: 'url',
    titles: standardizedItemName,
    format: 'json',
  });

  const searchResponse = await fetchMediaWikiResponse(searchParams);
  if (!searchResponse) return null;

  return searchResponse.query.pages[Object.keys(searchResponse.query.pages)[0]].fullurl || null;
}

async function fetchPageContent(url: string): Promise<string | null> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page.content();
}

export async function getItemStatsText(itemName: string): Promise<string | null> {
  const itemUrl = await getItemUrl(itemName);
  if (!itemUrl) {
    console.error('Item URL is null');
    return null;
  }

  const content = await fetchPageContent(itemUrl);
  if (!content) return 'No stats found';

  const statsTextMatch = content.match(/<div class="itembg">.*?<p>(.*?)<\/p>/s);
  return statsTextMatch ? statsTextMatch[1].trim() : 'No stats found';
}

export async function getSpellLevels(spellName: string): Promise<string | null> {
  const itemUrl = await getItemUrl(spellName);
  if (!itemUrl) {
    console.error('Item URL is null');
    return null;
  }

  const content = await fetchPageContent(itemUrl);
  if (!content) return null;

  const spellLevelsMatch = content.match(/<h2>.*?<\/h2>(.*?)<h2>/s);
  return spellLevelsMatch ? spellLevelsMatch[1].trim() : null;
}

export async function getSpellDescription(spellName: string): Promise<string | null> {
  const standardizedItemName = spellName.replace(/(Song: |Spell: )/g, '');
  const searchParams = new URLSearchParams({
    action: 'query',
    prop: 'revisions',
    titles: standardizedItemName,
    rvprop: 'content',
    format: 'json',
  });

  const searchResponse = await fetchMediaWikiResponse(searchParams);
  if (!searchResponse) return null;

  const pageId = Object.keys(searchResponse.query.pages)[0];
  const pageData = searchResponse.query.pages[pageId];
  if (!pageData.revisions) return null;

  const spellDescriptionMatch = pageData.revisions[0]['*'].match(/description\s*=\s*(.*)/);
  return spellDescriptionMatch ? spellDescriptionMatch[1] : null;
}
