(() => {
  // 流入元（utm_*）を公式フォーム・予約・代表プロフィールへ引き継ぐ。ボタン位置は utm_term に入れる
  const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_content'];
  const landing = new URLSearchParams(location.search);
  let utm = {};
  utmKeys.forEach(k => { if (landing.get(k)) utm[k] = landing.get(k); });
  try {
    if (utm.utm_source) sessionStorage.setItem('comixUtm', JSON.stringify(utm));
    else utm = JSON.parse(sessionStorage.getItem('comixUtm') || '{}');
  } catch { /* 保存できない環境では着地時の値だけを使う */ }
  if (!utm.utm_source) utm = {utm_source:'comix_ceo_ai_hp', utm_medium:'referral', utm_campaign:'ai_consult_202610'};
  const isTracked = url => (url.hostname === 'www.comix.co.jp' && url.pathname.startsWith('/contact')) || url.hostname.endsWith('eeasy.jp') || (url.hostname === 'suzuki-commits.github.io' && url.pathname.startsWith('/suzuki-akihiro-profile'));
  document.querySelectorAll('a[href^="http"]').forEach(a => {
    let url;
    try { url = new URL(a.href); } catch { return; }
    if (!isTracked(url)) return;
    const box = a.closest('section,header,footer');
    const area = a.dataset.cta || box?.id || box?.className.split(' ')[0] || 'page';
    utmKeys.forEach(k => { if (utm[k]) url.searchParams.set(k, utm[k]); });
    url.searchParams.set('utm_term', 'hp_' + area);
    a.href = url.toString();
  });
  const image = document.querySelector('.hero-art img');
  image?.addEventListener('error', () => image.classList.add('missing'));
  const form = document.querySelector('#diagnosis-form');
  const result = document.querySelector('#diagnosis-result');
  const outcomes = [
    ['いつもの仕事を1つ思い浮かべてください。','3つの問いに答えると、次の一歩を表示します。'],
    ['人が担う理由を、もう一度確かめる。','判断や対話が価値になる仕事なら、人の時間として守りましょう。'],
    ['AIと人で、工程を分けてみる。','調査や下書きをAIへ渡し、判断と仕上げを人が担う形が候補です。'],
    ['AIへ渡す仕事の候補です。','目的・手順・出来上がりの形を3行で書き、今週1回試してみましょう。']
  ];
  form?.addEventListener('change', () => {
    const count = form.querySelectorAll('input:checked').length;
    result.innerHTML = '<span>'+count+' / 3</span><strong>'+outcomes[count][0]+'</strong><p>'+outcomes[count][1]+'</p>';
  });
  const button = document.querySelector('#copy-template');
  const text = document.querySelector('#template-text');
  const status = document.querySelector('#copy-status');
  button?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(text?.textContent || ''); status.textContent='型をコピーしました。'; button.textContent='コピー済み'; }
    catch { status.textContent='コピーできませんでした。テキストを選択してコピーしてください。'; }
  });
})();
