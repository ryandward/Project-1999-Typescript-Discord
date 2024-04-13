import axios from 'axios';

export function formatField(field: string[]): string {
  const monoField = field.map(item => `\`${item}\``);
  return '\n' + monoField.join('\n') + '\n';
}
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

export async function getImageUrl(itemName: string): Promise<string | null> {
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
    redirects: 'true',
  });

  try {
    const searchResponse = await axios.get<MediaWikiResponse>(baseUrl, { params: searchParams });
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
      redirects: 'true',
    });

    const imageInfoResponse = await axios.get<MediaWikiResponse>(baseUrl, {
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

export async function getItemUrl(itemName: string): Promise<string | null> {
  // Standardize the item name to ensure cache consistency
  const standardizedItemName = itemName.replace('Song: ', '').replace('Spell: ', '');

  const baseUrl = 'http://localhost/mediawiki/api.php';
  const searchParams = new URLSearchParams({
    action: 'query',
    prop: 'info',
    inprop: 'url',
    titles: standardizedItemName,
    format: 'json',
    redirects: 'true',
  });

  const searchResponse = await axios.get<MediaWikiResponse>(baseUrl, { params: searchParams });

  // Return the 'fullurl' property of the page
  return (
    searchResponse.data.query.pages[Object.keys(searchResponse.data.query.pages)[0]].fullurl || null
  );
}

export async function getSpellDescription(spellName: string): Promise<string | null> {
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
    redirects: 'true',
  });

  try {
    const searchResponse = await axios.get<MediaWikiResponse>(baseUrl, { params: searchParams });
    const pageId = Object.keys(searchResponse.data.query.pages)[0];
    const pageData = searchResponse.data.query.pages[pageId];

    if (!pageData.revisions) {
      console.log(searchResponse.data);
      return null;
    }

    let spellText: string | null = '';
    const matchClasses = pageData.revisions[0]['*'].match(/classes\s*=\s*([\s\S]*?)(?=\n\|)/);
    const matchDesc = pageData.revisions[0]['*'].match(/description\s*=\s*([\s\S]*?)(?=\n\|)/);
    if (matchClasses) {
      spellText += matchClasses[1];
    }
    else {
      return null;
    }
    if (matchDesc) {
      spellText += '\n\n' + matchDesc[1];
    }
    // get rid of all html elements, i.e. anything between < and >
    return spellText.replace(/<[^>]*>/g, '');
  }
  catch (error) {
    console.error('Error fetching spell description:', error);
    return null;
  }
}

export async function getStatsBlock(itemName: string): Promise<string | null> {
  // Standardize the item name to ensure cache consistency

  // If not in cache, proceed to fetch the image URL
  const baseUrl = 'http://localhost/mediawiki/api.php';
  const searchParams = new URLSearchParams({
    action: 'query',
    prop: 'revisions',
    titles: itemName,
    rvprop: 'content',
    format: 'json',
    redirects: 'true',
  });

  try {
    const searchResponse = await axios.get<MediaWikiResponse>(baseUrl, { params: searchParams });
    const pageId = Object.keys(searchResponse.data.query.pages)[0];
    const pageData = searchResponse.data.query.pages[pageId];

    if (!pageData.revisions) {
      console.log(searchResponse.data);
      return null;
    }

    const matchStatsBlock = pageData.revisions[0]['*'].match(
      /statsblock\s*=\s*([\s\S]*?)(?=\n\||\}{2})/,
    );
    if (!matchStatsBlock) {
      return null;
    }

    // get rid of all html elements, i.e. anything between < and >
    const statsBlock = matchStatsBlock[1].replace(/<[^>]*>/g, '');

    return statsBlock;
  }
  catch (error) {
    console.error('Error fetching spell description:', error);
    return null;
  }
}
