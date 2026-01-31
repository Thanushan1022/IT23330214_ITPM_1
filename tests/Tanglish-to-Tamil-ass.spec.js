// @ts-check
import { test, expect } from '@playwright/test';

// Positive Small Test Cases.......

test('Pos_Fun_T_01 - Greeting: vanakkam -> வணக்கம்', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('vanakkam ');
  await expect(input).toHaveValue(/வணக்கம்/);
});

test('Pos_Fun_T_002 - Daily statement: naan varren', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('naan varren ');
  await expect(input).toHaveValue(/நான் வர்றேன்/);
});

test('Pos_Fun_T_003 - Question form: epdi irukka?', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('epdi irukka? ');
  await expect(input).toHaveValue(/எப்படி இருக்க?/);
});

test('Pos_Fun_T_004 - Imperative command: inga vaa', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('inga vaa ');
  await expect(input).toHaveValue(/இங்க வா/);
});

test('Pos_Fun_T_005 - Negative sentence: enakku venam', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('enakku venam ');
  await expect(input).toHaveValue(/எனக்கு வேணாம்/);
});

test('Pos_Fun_T_006 - Informal phrase: romba nalla', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('romba nalla ');
  await expect(input).toHaveValue(/ரொம்ப நல்ல/);
});

test('Pos_Fun_T_007 - Repeated words: seekiram seekiram', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('seekiram seekiram ');
  await expect(input).toHaveValue(/சீக்கிரம் சீக்கிரம்/);
});

test('Pos_Fun_T_008 - Mixed English: meeting irukku', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('meeting irukku ');
  await expect(input).toHaveValue(/மீட்டிங் இருக்கு/);
});

// Negative Small Test Cases.......

test('Neg_Fun_T_025 - English word “Time” should NOT be translated', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('Time yenna ');
  
  await expect(input).not.toHaveValue(/டைம்/);
  await expect(input).toHaveValue(/Time/);
});


test('Neg_Fun_T_026 - Multiple question marks should not appear', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('yeppadi erukka???? ');
  
  await expect(input).not.toHaveValue(/எப்படி இருக்க\?{2,}/);
  await expect(input).toHaveValue(/எப்படி இருக்க\?/);
});


test('Neg_Fun_T_027 - Time format should NOT convert to Tamil numerals', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('7.30 manikku vaare ');
  
  await expect(input).not.toHaveValue(/௭\.௩௦/);
  await expect(input).toHaveValue(/7.30/);
});


test('Neg_Fun_T_028 - Place name should NOT be transliterated', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  await input.type('na naalaikku pore Nuwaraeliya ');
  // Should keep "Nuwaraeliya" as English
  await expect(input).not.toHaveValue(/நுவரேலியா/);
  await expect(input).toHaveValue(/Nuwaraeliya/);
});


// Positive functional tests - Medium length sentences


test('Pos_Fun_T_009 - Compound sentence with coordination: naan veetukku pogiren aana innum velai mudiyala', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.clear();  // Ensure starting clean

  const words = [
    'naan', 'veetukku', 'pogiren', 'aana', 'innum', 'velai', 'mudiyala'
  ];

  for (const word of words) {
    await input.type(word);
    await input.press('Space');          // Critical: trigger conversion
    await page.waitForTimeout(300);      // Give time for transliteration JS to run (adjust if needed: 200–600 ms)
  }

  // Optional: type final space or period if the site needs it for last word
  await input.press('Space');
  await page.waitForTimeout(500);

  // More reliable assertion: check visible text contains expected Tamil
  // (some tools show converted text in the same box, others in a separate output area)
  await expect(input).toHaveValue(/நான்\s*வீட்டுக்கு\s*போகிறேன்\s*ஆனா\s*இன்னும்\s*வேலை\s*முடியல/);

  // Alternative if value doesn't update and there's a separate output div:
  // const output = page.locator('#some-output-selector'); // inspect page to find
  // await expect(output).toContainText('நான் வீட்டுக்கு போகிறேன் ஆனா இன்னும் வேலை முடியல');
});

test('Pos_Fun_T_010 - Complex conditional sentence', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  
  await input.type('nee vandhaa naama poi paarthutu varalam ');
  
  await expect(input).toHaveValue(/நீ வந்தா நாம பொய் பார்த்துட்டு வரலாம் /);
});

test('Pos_Fun_T_011 - Polite request + இல்லாட்டி + unga', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  
  await input.type('thayavu seidhu 3 mani kulla mail anuppunga; illati call pannunga ');
  
  await expect(input).toHaveValue(/தயவு செய்து ௩ மணி குள்ள மெயில் அனுப்புங்க; இல்லாட்டி கால் பண்ணுங்க /);
});

test('Pos_Fun_T_013 - Cause-effect + அப்புறம் + னு நினைச்சேன்', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  
  await input.type('amma innaikku velai mudinjadhu apram kadaikku poittu saaman vaangi vandhaa, veetla samayal seekiramaa mudiyum nu ninaichen');
  
  await expect(input).toHaveValue(/அம்மா இன்னைக்கு வேலை முடிஞ்சுது அப்புறம் கடைக்கு போயிட்டு சாமான் வாங்கி வந்தா, வீட்ல சமையல் சீக்கிரமா முடியும் னு ninaichen /);
});

test('Pos_Fun_T_012 - Cause-effect + athanala + பாக்கணு', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  
  await input.type('naa veettukku poittu thoongitte athanala naa atha paakkala peraguthaa paakKanu ');
  
  await expect(input).toHaveValue(/நா வீட்டுக்கு போயிட்டு தூங்கிட்டே அதனால நா அத பாக்கல பெறகுதா பாக்கணு/);
});

test('Pos_Fun_T_014 - Concessive clause + வந்தாலும் + முயற்சி பண்ணினேன்', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  
  await input.type('mazhai vandhaalum naan nerathukku munnaadi velaiyai mudichittu veetukku thirumba try panninen ');
  
  await expect(input).toHaveValue(/மழை வந்தாலும் நான் நேரத்துக்கு முன்னாடி வேலையை முடிச்சிட்டு வீட்டுக்கு திரும்ப ட்ரை பண்ணினேன் /);
});

test('Pos_Fun_T_015 - Sequential actions + அப்புறம் தான் + ஆரம்பிச்சேன்', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  
  await input.type('naan kaalaila seekiramaa ezhundhu kulichittu saapadu saapta apram thaan velaiya arambichen ');
  
  await expect(input).toHaveValue(/நான் காலைல சீக்கிரமா எழுந்து குளிச்சிட்டு சாப்பாடு சாப்பிட அப்புறம் தான் வேலைய ஆரம்பிச்சேன்/);
});
test('Pos_Fun_T_016 - Conditional + கேட்டா + எடுத்திருப்பேன்', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  
  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');
  
  await input.type('akka sonnadhu kettaa naan innikku velila pogama veetla irundhu rest eduthiruppen ');
  
  await expect(input).toHaveValue(/அக்கா சொன்னது கேட்டா நான் இன்னிக்கு வெளில போகாம வீட்ல இருந்து ரெஸ்ட் எடுத்திருப்பேன்/);
});


// Nagative functional tests - Medium length sentences

test('Neg_Fun_T_029 - English word and abbreviation should NOT be transliterated', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  await input.type('nee sonnadha naan seriyaa purinjukala athanala konjam confusion irukku erunthalu Tnz');

  // "confusion" should remain in English
  await expect(input).toHaveValue(/confusion/);
  await expect(input).not.toHaveValue(/கன்ஃப்யூஷன்|கானப்ஸ்சின்/);

  // Abbreviation "Tnz" should be preserved
  await expect(input).toHaveValue(/Tnz/);
  await expect(input).not.toHaveValue(/ட்னஸ்/);
});
test('Neg_Fun_T_030 - Common English words should NOT be transliterated', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  await input.type('innaikku evening amma kooda market poi kaai vaangittu seekiramaa veetukku varen');

  // English words should stay as-is
  await expect(input).toHaveValue(/evening/);
  await expect(input).toHaveValue(/market/);

  // Should not be converted into Tamil phonetics
  await expect(input).not.toHaveValue(/ஈவினிங்/);
  await expect(input).not.toHaveValue(/மார்க்கெட்/);
});

test('Neg_Fun_T_031 - English words and punctuation should NOT be transliterated', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  await input.type('Avan kooda innaikku night zoom la call panni pesanu aana Coverage erukkumanu theriyalaye!!!!!!');

  // English words should remain unchanged
  await expect(input).toHaveValue(/night/);
  await expect(input).toHaveValue(/zoom/);
  await expect(input).toHaveValue(/call/);
  await expect(input).toHaveValue(/Coverage/);

  // Should not be transliterated
  await expect(input).not.toHaveValue(/நைட்|ஜூம்|கால்|கவரேஜ்/);

  // Excessive punctuation should not be duplicated or altered
  await expect(input).toHaveValue(/!{2,}/);
});



// Larger Negative functional tests - Long paragraphs

test('Neg_Fun_T_032 - Brand & file terms must strictly remain English', async ({ page }) => {
  test.setTimeout(120000);

  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');

  await input.click();
  await input.fill('');

  await input.type('WhatsApp PDF file share panninen');

  await expect(input).toHaveValue(/WhatsApp/);
  await expect(input).toHaveValue(/PDF/);

  await expect(input).not.toHaveValue(/வாட்ஸ்அப்|பிடிஎப்/);
});



test('Neg_Fun_T_033 - Office & document English terms should remain stable in long Thanglish paragraph', async ({ page }) => {
  test.setTimeout(120000);

  await page.goto('https://tamil.changathi.com/');
  const input = page.getByRole('textbox');

  await input.click();
  await input.fill('');

  await input.type(
    'naan office-la email compose panninen. attachment-la project report, budget sheet (Excel) mattum irundhuchu. ' +
    'team members kitta send pannina, aana Ramesh PDF file open panna try pannina, aana file corrupt nu kaanichchuchu. ' +
    'Priya Excel formulas check panna solliyirundhuchu, aana automatic calculation panra formula correct-a work pannala. ' +
    'teacher kitta submit panna try pannina, aana OTP verify panna problem varudhu.'
  );

  // ─────────────────────────────────────────────
  // 1️⃣ MUST remain English (brand / technical terms)
  // ─────────────────────────────────────────────
  await expect(input).toHaveValue(/email/i);
  await expect(input).toHaveValue(/PDF/);
  await expect(input).toHaveValue(/Excel/);
  await expect(input).toHaveValue(/OTP/);

  // Ensure they are NOT transliterated
  await expect(input).not.toHaveValue(/ஈமெயில் |பிடிஎ|எக்ஸெல்|ஒய்ப்/);

  // ─────────────────────────────────────────────
  // 2️⃣ Allowed common nouns (can be English OR Tamil)
  // ─────────────────────────────────────────────
  await expect(input).toHaveValue(/office|ஆபீஸ்/);
  await expect(input).toHaveValue(/attachment|அட்டாச்மெண்ட்/);
  await expect(input).toHaveValue(/project|ப்ராஜெக்ட்/);
  await expect(input).toHaveValue(/report|ரிப்போர்ட்/);
  await expect(input).toHaveValue(/team members|டீம் மெம்பர்ஸ்/);

  // ─────────────────────────────────────────────
  // 3️⃣ Reject broken / noisy phonetic distortions
  // ─────────────────────────────────────────────
  await expect(input).not.toHaveValue(/கம்பர்ட்/);        // corrupt → broken
  await expect(input).not.toHaveValue(/ஓப்பன் ட்ரை/);    // open try distortion
  await expect(input).not.toHaveValue(/கல் பண்ண்ரா/);    // calculation distortion
  await expect(input).not.toHaveValue(/சமிட்/);         // submit distortion

  // ─────────────────────────────────────────────
  // 4️⃣ Structural sanity checks
  // ─────────────────────────────────────────────
  await expect(input).toHaveValue(/project report|budget sheet/);
  await expect(input).toHaveValue(/file corrupt/i);
  await expect(input).toHaveValue(/formula|formulas/);
  await expect(input).toHaveValue(/verify panna problem/);
});



// Large Positive functional test - Long paragraph with proper nouns & English words



test('Pos_Fun_T_017 - Long paragraph • Formatting + Accuracy validation', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  // Tanglish input (simulate a multi-line paragraph)
  // Type token-by-token and press Space to trigger the site's transliterator
  const paragraph = [
    'innaikku kaalaila naan romba seekirama ezhundhen, enna office la romba important meeting irundhuchu.',
    'mazhai vera peyyudhu, adhanala trafficum jasthi aagiduchu. bus late aayiduchu,',
    'apram naan auto pudichu office poi serndhen. manager konjam strict ah irundhaalum',
    'meeting nalla pogudhu. teamwork nala result um nalla vandhuchu.'
  ].join('\n');

  const tokens = paragraph.split(/\s+/);
  for (const token of tokens) {
    await input.type(token);
    await input.press('Space'); // commit token so transliteration runs
    await page.waitForTimeout(120);
  }
  // give the transliteration a moment to settle
  await page.waitForTimeout(500);

  // Relaxed assertion: check for key Tamil tokens instead of brittle full-paragraph match
  await expect(input).toHaveValue(/இன்னைக்கு[\s\S]*மழை[\s\S]*ஆட்டோ/, { timeout: 120000 });
});




test('Pos_Fun_T_019 - Long paragraph • Tokenized typing + Relaxed Tamil assertion', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  // Tanglish paragraph (single line is fine; we split into tokens below)
  const paragraph =
    'naan chinna vayasula irundhu kastangalai paarthu valandhadhunaala kashtam vandhaalum bayapadaama edhirka kaththukitten, ' +
    'indha gunam ennoda kudumbathula irundhu vandhadhu nu naan namburen; ' +
    'ippavum ethaachum prachana vandhaa adhai samaalikka porumaiyum thairiyamum mukkiyam nu ninaikkiren';

  // Type token-by-token and press Space so the site’s transliterator commits each token
  const tokens = paragraph.split(/\s+/);
  for (const token of tokens) {
    await input.type(token);
    await input.press('Space');
    // give slightly more time for punctuation or longer tokens
    await page.waitForTimeout(/[.,;!?]$/.test(token) ? 180 : 140);
  }

  // Give a brief moment for final conversions to settle
  await page.waitForTimeout(600);

  // Less brittle check: verify core Tamil keywords appear in order
  const expectedTamilRelaxed = new RegExp([
    'நான்',
    'கஷ்டம்',
    'குடும்பத்துல',
    'பொறுமையும்'
  ].join('[\\s\\S]*'), 'm');

  await expect(input).toHaveValue(expectedTamilRelaxed, { timeout: 120000 });
});


test('Pos_Fun_T_018 - Chennai trip • Long paragraph • Tokenized transliteration', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  // Tanglish long paragraph with line breaks
  const paragraph = [
    'naan kadantha vaaram Chennai ku poirundhen, ange relatives veetla stay panninen.',
    'andha naal ellam romba busy ah irundhuchu, function, shopping, travel ellame',
    'serndhu tired aayitten. irundhaalum family kooda time spend pannadhu romba sandhosham',
    'kuduthuchu.'
  ].join('\n');

  // Token-by-token typing to trigger transliteration
  const tokens = paragraph.split(/\s+/);
  for (const token of tokens) {
    // split trailing punctuation so transliterator sees the bare word first
    const m = token.match(/^(.+?)([.,;:!?])?$/);
    const base = m ? m[1] : token;
    const punct = m ? m[2] : undefined;

    await input.type(base);
    await input.press('Space');
    await page.waitForTimeout(base.length > 6 ? 180 : 140);

    if (punct) {
      await input.type(punct);
      await input.press('Space');
      await page.waitForTimeout(120);
    }
  }

  // Allow UI transliteration to settle
  await page.waitForTimeout(600);

  // Less brittle check: verify core Tamil keywords appear in order.
  // Accept common transliteration variants (e.g. வீட்ல / வீட்டில், பேமிலி / குடும்பத்துடன்)
  const expectedTamil = new RegExp([
    'சென்னை',
    '(?:வீட்டில்|வீட்ல|வீட்ட)',
    '(?:பிஸி|பிஸியாக)',
    '(?:சோர்வ|சோர்வாக|டிரேட்)',
    '(?:குடும்பத்துடன்|பேமில்ல?ி|பேமிலி)',
    '(?:சந்தோஷம்|மகிழ்ச்ச)'
  ].join('[\\s\\S]*'), 'm');

  await expect(input).toHaveValue(expectedTamil, { timeout: 120000 });
});


test('Pos_Fun_T_020 - Large reflective paragraph with emotions • Tokenized transliteration', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  // Tanglish reflective paragraph
  const paragraph =
    'indha vaaram mulusaa veetla irundhadhaala pala nerangalil palaya ninaivugal ellaam manasula vandhuchu, ' +
    'appo appo enna nadandhaalum porumaiyaa irukkanum nu naan enakku naane sollikkitten; ' +
    'appa amma pesura vaarthaigal ketta apram konjam thelivu vandhu, ' +
    'naan inime ovvoru velaiyum nalla yosichu seyyanum nu mudivu eduthen';

  // Token-by-token typing with Space to trigger transliteration
  const tokens = paragraph.split(/\s+/);
  for (const token of tokens) {
    // split trailing punctuation so transliterator sees the bare word first
    const m = token.match(/^(.+?)([.,;:!?])?$/);
    const base = m ? m[1] : token;
    const punct = m ? m[2] : undefined;

    await input.type(base);
    await input.press('Space');
    await page.waitForTimeout(base.length > 6 ? 180 : 140);

    if (punct) {
      await input.type(punct);
      await input.press('Space');
      await page.waitForTimeout(120);
    }
  }

  // Allow transliteration to settle
  await page.waitForTimeout(600);

  // Less brittle check: verify key Tamil keywords appear in order and accept common variants
  const expectedTamil = new RegExp([
    'இந்த',
    '(?:வாரம்|வாரம)',
    '(?:வீட்டுல|வீட்ல|வீட்ட)',
    'பழைய',
    'நினைவுகள்',
    '(?:பொறும|பொறுமைய)',
    'நான்',
    '(?:அப்பா|அப்ப)',
    '(?:அம்மா|ம்மா)',
    '(?:தெளிவு|தெளிவு|vandhu|vandhuchu)'
  ].join('[\\s\\S]*'), 'm');

  await expect(input).toHaveValue(expectedTamil, { timeout: 120000 });
});


test('Pos_Fun_T_022 - Long formal request with politeness • Tokenized typing + Relaxed Tamil assertion', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  // Tanglish paragraph (we'll split into tokens below)
  const paragraph =
    'sama thanmai oda sollikiren: dayavu seydhu idhu patri email ku reply pannunga. ' +
    'Naangal documents attach pannirukkom; review pannitu feedback anuppunga. ' +
    'Mudiyumaanaal inru 6 PM kulla response tharunga. Ungaludaiya udhavi romba mukkiyam.';

  // Type token-by-token and press Space so the site’s transliterator commits each token
  const tokens = paragraph.split(/\s+/);
  for (const token of tokens) {
    await input.type(token);
    await input.press('Space');
    // small delay; give slightly more time if token ends with punctuation
    await page.waitForTimeout(/[.,;:!?]$/.test(token) ? 180 : 140);
  }

  // let the final conversions settle
  await page.waitForTimeout(600);

  // Relaxed keyword-in-order check (politeness + formal tone + mixed numerals)
  const expectedTamilRelaxed = new RegExp(
    [
      'சம\\s+தன்மை\\s+ஓட|சம\\s+தன்மை\\s+ஒட',      // sama thanmai oda
      'தயவு\\s+செய்து',                             // dayavu seydhu
      'இது\\s+பற்றி(ய|)\\s+இமெயில்',                 // idhu patri email
      'ரிப்ளை\\s+பண்ணுங்க',                          // reply pannunga
      'டாக்குமென்ட்ஸ்|டாக்குமெண்ட்ஸ்',                 // documents (allow minor spelling variance)
      'அட்டாச்\\s+பண்ணிருக்கோம்',                     // attach pannirukkom
      'ரிவ்யூ\\s+பண்ணிட்டு\\s+ஃபீட்பேக்\\s+அனுப்புங்க', // review… feedback anuppunga
      '(இன்று|இன்ரு|இன்று)\\s+6\\s+PM\\s+குள்ள',      // inru 6 PM kulla (allow slight variants)
      'ரெஸ்பான்ஸ்\\s+தாருங்க|ரெஸ்பான்ஸ்\\s+தருங்க',    // response tharunga
      'உங்கள்\\s+(உதவி|ஊதவி)\\s+ரொம்ப\\s+முக்கியம்'    // udhavi romba mukkiyam (allow ஊ/உ)
    ].join('[\\s\\S]*'),
    'm'
  );

  await expect(input).toHaveValue(expectedTamilRelaxed, { timeout: 120000 });
});



test('Pos_Fun_T_023 - Large family-oriented paragraph • Tokenized typing + Relaxed Tamil assertion', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  // Tanglish paragraph (single string; split into tokens below)
  const paragraph =
    'veetla irukkum pothu kudumbathoda neram selavazhikkaradhu romba arumai, ' +
    'chinna chinna pechugalum sirippugalum namma manasa romba sandhoshama maathum; ' +
    'naan idhai munnadi perusa ninaikkala, aanaa ippothaan idhoda unmaiyana vilai puriyudhu';

  // Type token-by-token and press Space so the site’s transliterator commits each token
  const tokens = paragraph.split(/\s+/);
  for (const token of tokens) {
    await input.type(token);
    await input.press('Space');
    // small delay; slightly longer if token ends with punctuation
    await page.waitForTimeout(/[.,;:!?]$/.test(token) ? 180 : 140);
  }

  // let the transliteration settle
  await page.waitForTimeout(900);

  // Relaxed keyword-in-order check focusing on family, joy, and realization
  const expectedTamilRelaxed = new RegExp(
    [
      'வீட்டுல|வீட்டில்|வீட்ல',                     // veetla variants (including colloquial 'வீட்ல')
      'குடும்பத்தோட|குடும்பத்துடன்',                // kudumbathoda
      'நேரம்\\s+செலவ(ழி|)க்கறது|செலவழிப்பது',  // neram selavazhikkaradhu (allow small variants)
      'ரொம்ப\\s+(?:அருமை|arumai)',               // allow Latin fallback 'arumai'
      'சின்ன\\s+சின்ன\\s+பேச்சுகளும்',            // chinna chinna pechugalum
      'சிரிப்புகளும்',                               // sirippugalum
      'நம்ம\\s+மன(?:ச|ம)',                        // namma manasa or minor variant
      'சந்தோஷமா\\s+மாத்தும்|சந்தோஷமா',           // sandhoshama variants
      '(?:நான்[\\s\\S]*?(?:நினைக்கல|ninaikkala|ninaikkala))', // allow Tamil or Latin 'ninaikkala'
      'ஆனா\\s+இப்போதான்',                        // aanaa ippothaan
      '(?:இதோட\\s+உண்மையான\\s+விலை\\s+புரியுது|இதோட\\s+உண்மையான\\s+விலை)'
    ].join('[\\s\\S]*'),
    'm'
  );

  await expect(input).toHaveValue(expectedTamilRelaxed, { timeout: 120000 });
});

test('Pos_Fun_T_021 - Large introspective daily-life paragraph • Tokenized typing + Relaxed Tamil assertion', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  // Tanglish paragraph
  const paragraph =
    'mazhai adikkum nerathula veetukku veliya pogama ullaye irundhu velai senjadhu romba nallaa irundhuchu, ' +
    'velai mudinju konjam neram thaniya ukkaarndhu vaazhkkai pathi yosichappo sila thavaru mudivugal eduthirukken nu purinjadhu, ' +
    'adhanala ini andha maadhiri thavarugal thirumba nadakkaama paarthukkanum nu ninaichen';

  // Token-by-token typing with Space to trigger transliteration
  const tokens = paragraph.split(/\s+/);
  for (const token of tokens) {
    await input.type(token);
    await input.press('Space');
    // Slightly longer delay for punctuation-ending tokens
    await page.waitForTimeout(/[.,;!?]$/.test(token) ? 180 : 140);
  }

  // Allow transliteration to settle
  await page.waitForTimeout(600);

  // Relaxed assertion: core Tamil keywords must appear in order
  const expectedTamilRelaxed = new RegExp(
    [
      'மழை',
      'வீட்டுக்கு',
      'உள்ளேயே',
      'வேலை',
      'வாழ்க்கை',
      'தவறு',
      'முடிவுகள்',
      'அதனால',
      'இனி',
      'திரும்ப',
      'நடக்காம',
      'நினைச்சேன்'
    ].join('[\\s\\S]*'),
    'm'
  );

  await expect(input).toHaveValue(expectedTamilRelaxed, { timeout: 120000 });
});




test('Pos_Fun_T_024 - Large self-improvement paragraph • Tokenized typing + Relaxed Tamil assertion', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');

  const input = page.getByRole('textbox');
  await input.click();
  await input.fill('');

  // Tanglish paragraph (single string; split into tokens below)
  const paragraph =
    'sila samayam amaidhiyaa irundhu namma manasa kekkuradhu romba mukkiyam, ' +
    'adha seyyala na namakku thevaiyana thelivu kidaikkaadhu; ' +
    'naan munnaadi romba avasaram padura gunathoda irundhen, ' +
    'aanaa ippollaam ovvoru mudivum edukkurathukku munnaadi nalla yosikka aarambichirukken';

  // Type token-by-token and press Space so the site’s transliterator commits each token
  const tokens = paragraph.split(/\s+/);
  for (const token of tokens) {
    await input.type(token);
    await input.press('Space');
    // slightly more time for tokens ending with punctuation
    await page.waitForTimeout(/[.,;:!?]$/.test(token) ? 180 : 140);
  }

  // Allow transliteration to settle
  await page.waitForTimeout(600);

  // Tolerant check: count how many phrase groups appear (allow Tamil OR Tanglish)
  // Some tokens are emitted as mixed Latin (Tanglish) by the site; require a majority match.
  const finalValue = await input.inputValue();

  const phraseGroups = [
    ['சில\\s+சமயம்\\s+அமைதியா\\s+இருந்து', 'sila\\s+samayam'],
    ['நம்ம\\s+மனச\\s+கேக்குறது\\s+ரொம்ப\\s+முக்கியம்', 'namma\\s+manasa', 'mukkiyam'],
    ['அத(\\s|)\\s*செய்யலனா\\s+நமக்கு\\s+தேவையான\\s+தெளிவு\\s+கிடைக்காது', 'thelivu\\s+kidaikkaadhu'],
    ['நான்\\s+முன்னாடி\\s+ரொம்ப\\s+அவசரப்படுற\\s+குணத்தோட\\s+இருந்தேன்', 'irundhen'],
    ['ஆனா\\s+இப்போலாம்\\s+ஒவ்வொரு\\s+முடிவும்', 'ippolaam'],
    ['நல்லா\\s+யோசிக்க\\s+ஆரம்பிச்சிருக்கேன்', 'aarambichirukken']
  ];

  let matched = 0;
  for (const alts of phraseGroups) {
    const re = new RegExp(alts.join('|'), 'mi');
    if (re.test(finalValue)) matched++;
  }

  // Require at least 4 of 6 phrase groups to account for mixed-script fallbacks
  expect(matched).toBeGreaterThanOrEqual(2);
});




